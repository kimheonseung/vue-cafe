import axios from "axios"

const url = 'http://localhost:8888/cafe/menu'

const getMenu = async (page, size) => {
    if(!page)
        page = 1;
    if(!size)
        size = 6;
    
    const queryString = '?page='+page+'&size='+size;
    return axios
        .get(url+queryString)
        .then(rs => {
            if(rs.data.status === 200) {
                return {
                    result: true,
                    menu: rs.data.dataArray,
                    paging: rs.data.paging
                }
            } else {
                console.log(rs.data);
                return {
                    result: false
                }
            }
        })
        .catch(e => {
            console.error(e);
            return {
                result: false
            }
        })
}

export default {
    install(Vue) {
        Vue.config.globalProperties.$getMenu = getMenu;
    }
}