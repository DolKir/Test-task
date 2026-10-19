'use strict';

(function (){
    const form = document.getElementById('product-form');
    if(!form){
        return;
    }
    const els = {
        sku:document.getElementById('product-sku'),
        price:document.getElementById('price-current'),
        oldPrice:document.getElementById('price-old'),
        badge:document.getElementById('discount-bage'),
        buyBtn:document.getElementById('buy-btn'),
        buyText:document.querySelector('product__buy-text'),
        cartCount:document.getElementById('cart-count'),
    }
    function formPrice(value){
        const number = Number(value);
        const formatted = new Intl.NumberFormat('ru-RU',{
            minimumFractionDigits: Number.isInteger(number) ? 0:2,
            maximumFractionDigits: 2,
        }).format(number);
        return `${formatted} руб`;
    }
    function updateProduct(input){
        const {sku, price, oldPrice} = input.dataset;
        const hasDiscount = Number(oldPrice) > Number(price);

        els.sku.textContent = sku;
        els.price.textContent = formPrice(price)
        els.oldPrice.hidden = !hasDiscount;
        els.badge.hidden = !hasDiscount;

        if(hasDiscount){
            const percent = Math.round((1 - Number(price) / Number(oldPrice)) * 100);
            els.oldPrice.textContent = formPrice(oldPrice);
            els.badge.textContent.Content = `${percent}`;
        }
    }
    form.addEventListener(`change`, (event)=>{
        if(event.target.name === `weight`){
            updateProduct(event.target)
        }
    });
    const checked = form.querySelector(`input[name="weight"]:checked`);
    if(checked){
        updateProduct(checked);
    }
    let resetTimer = null;
    els.buyBtn.addEventListener(`click`,()=>{
        els.cartCount.textContent = Number(els.cartCount.textContent) + 1;
        els.buyText.textContent = `Добавлено`;

        clearTimeout(resetTimer);
        resetTimer = setTimeout(()=>{
            els.buyBtn.classList.remove(`is-added`);
            els.buyText.textContent = `В корзину`;
        }, 1600)
    });
})();