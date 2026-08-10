import { getTextContent, getDateValue } from 'notion-utils';
import { createNotionApi } from './api';
import { siteConfig } from '@/site.config';

// Simple implementation of mapImageUrl if import fails
const mapImageUrl = (url: string, block: any) => {
    if (!url) {
        return null;
    }

    if (url.startsWith('data:')) {
        return url;
    }

    if (url.startsWith('/')) {
        return `https://www.notion.so${url}`;
    }

    return url;
};

export default async function getPageProperties(
    id: string,
    block: any,
    schema: any,
    authToken?: string
) {
    const api = createNotionApi();
    const rawProperties = Object.entries(block?.[id]?.value?.properties || []);
    const excludeProperties = ['date', 'select', 'multi_select', 'person'];
    const properties: any = {};

    for (let i = 0; i < rawProperties.length; i++) {
        const [key, val] = rawProperties[i] as [string, any];
        properties.id = id;
        if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
            properties[schema[key].name] = getTextContent(val);
        } else {
            switch (schema[key]?.type) {
                case 'date': {
                    const dateProperty: any = getDateValue(val);
                    delete dateProperty.type;
                    properties[schema[key].name] = dateProperty;
                    break;
                }
                case 'select':
                case 'multi_select': {
                    const selects = getTextContent(val);
                    if (selects[0]?.length) {
                        properties[schema[key].name] = selects.split(',');
                    }
                    break;
                }
                case 'person': {
                    const rawUsers = val.flat();
                    const users = [];
                    for (let i = 0; i < rawUsers.length; i++) {
                        if (rawUsers[i][0][1]) {
                            const userId = rawUsers[i][0];
                            const res = await api.getUsers(userId);
                            // @ts-ignore
                            const resValue = res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value;
                            const user = {
                                id: resValue?.id,
                                first_name: resValue?.given_name,
                                last_name: resValue?.family_name,
                                profile_photo: resValue?.profile_photo
                            };
                            users.push(user);
                        }
                    }
                    properties[schema[key].name] = users;
                    break;
                }
                default:
                    break;
            }
        }
    }

    // Get the cover image from the block
    function getPostCover(id: string, block: any) {
        const pageCover = block[id].value?.format?.page_cover;
        if (pageCover && pageCover.startsWith('/')) {
            return 'https://www.notion.so' + pageCover;
        } else if (pageCover && pageCover.startsWith('http')) {
            return mapImageUrl(pageCover, block[id].value);
        } else {
            // Default cover is currently undefined in siteConfig type but optional
            return null;
        }
    }

    properties.page_cover = getPostCover(id, block);
    delete properties.content;
    return properties;
}
