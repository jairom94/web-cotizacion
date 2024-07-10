import { defineStore } from 'pinia';
const AMAZON = {
    hogar:'AMAZON_HOGAR',
    cuidado:'AMAZON_CUIDADO',
    videojuegos:'AMAZON_VIDEOJUEGOS'
}
const SHEIN = {
    superventas:'SHEIN_SUPERVENTAS',
    novedades:'SHEIN_NOVEDADES'    
}
const ALIEXPRESS = {
    sugeridos:'ALIEXPRESS_SUGERIDOS',
}

const useProductsStore = defineStore('products', {
    state: () => ({
        products_amazon_hogar:[],
        products_amazon_cuidado:[],
        products_shein_superventas:[],
        products_shein_novedades:[],
        products_aliexpress_sugeridos:[],
    }),
    getters:{
        getLenAmazonHogar(){
            return this.products_amazon_hogar.length;
        },
        getLenSheinSuperventas(){
            return this.products_shein_superventas.length;
        },
        getLenAliSugeridos(){
            return this.products_aliexpress_sugeridos.length;
        },
        sliceAliexpressSugeridos(){
            return (inicio,fin) => this.products_aliexpress_sugeridos.slice(inicio,fin);
        }
    },
    actions:{
        async fetchProducts(shop){
            if(shop===AMAZON.hogar){
                const response = await fetch(`/src/API/AMAZON/${shop}.json`);
                const data = await response.json();
                this.products_amazon_hogar = data;//.slice(0,4);
                //console.log(data)
            }
            else if(shop===AMAZON.cuidado){
                const response = await fetch(`/src/API/AMAZON/${shop}.json`);
                const data = await response.json();
                this.products_amazon_cuidado = data;//.slice(0,4);
                //console.log(data)
            }
            else if(shop === SHEIN.superventas){
                const response = await fetch(`/src/API/SHEIN/${shop}.json`);
                const data = await response.json();
                this.products_shein_superventas = data;//.slice(0,4);
                //console.log(data)
            }
            else if(shop === SHEIN.novedades){
                const response = await fetch(`/src/API/SHEIN/${shop}.json`);
                const data = await response.json();
                this.products_shein_novedades = data.slice(0,6);
                //console.log(data);
            }
            else if(shop === ALIEXPRESS.sugeridos){
                const response = await fetch(`/src/API/ALIEXPRESS/${shop}.json`);
                const data = await response.json();
                this.products_aliexpress_sugeridos = data;//.slice(0,6);
                //console.log(data);
            }

        }

    }  
})

export default useProductsStore;