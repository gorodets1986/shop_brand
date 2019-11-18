Vue.component('filter-el', {
    data(){
        return {
            userSearch: ''
        }
    },
    template: `<form action="#" method="post" @submit.prevent="$parent.$refs.products.filter(userSearch)">
            <input type="search" placeholder="Search for Item..." class="drop__search" v-model="userSearch">
            <button type="submit" class="drop__submit"><i class="fas fa-search"></i></button>
        </form>`
});