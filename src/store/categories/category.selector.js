export const CATEGORIES_ACTION_TYPES = {
    SET_CATEGORIES : 'category/SET_CATEGORIES_MAP'
}
export const selectCategoriesMap = (state) => state.categories.categories
.reduce((acc,category) => {

    //destructing off the data fro the snapshot
    const {title,items}=category;
    acc[title.toLowerCase()]=items;
    return acc;
},{});
