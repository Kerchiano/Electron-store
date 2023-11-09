$(document).ready(function () {
    $("#cart-items").hide();
    $(".cart").on("click", function () {
        $("#cart-items").slideToggle();
    });

    let totalPrice = localStorage.getItem('totalPrice') === null ? 0 :
        JSON.parse(localStorage.getItem('totalPrice'))
    let count = localStorage.getItem('count')
    count = count ? count : 0
    let data = JSON.parse(localStorage.getItem('data'))
    for (let value in data) {
        $("#list-item").append(`<li>${data[value].name} - <span>${data[value].price}
        </span><span class='sub' id='${value}'>-</span>
        <span id='quantity' data-product-id='${value}'> ${data[value].quantity} </span>
        <span class='add' id='${value}'>+</span>
        <button id='${value}' class='remove'> X </button></li>`);
    }
    for (let value in data) {
        $(".list-orders").append(`<li class="order"><div class="checkout-product">
                            <a href="#" class="checkout-product-link">
                                <figure class="checkout-product-picture">
                                    <img class="checkout-product-image" id="image" src="${data[value].image}" alt="">
                                </figure>
                            </a>
                            <div class="checkout-product-description">
                                <div class="checkout-product-label">
                                    <a href="#" class="checkout-product-link"><span
                                            class="checkout-product-name" id="product">${data[value].name}</span></a>
                                </div>
                                <div class="checkout-product-cost">
                                    <div class="checkout-product-count">
                                        <span class="checkout-product-price" id="price">
                                        ${data[value].price + ' $'}
                                        </span>
                                        <span class="checkout-product-quantity" id="qty">
                                        ${' x ' + data[value].quantity + ' ед.'}</span>
                                    </div>
                                </div>
                                <div class="checkout-product-amount">
                                    <span class="checkout-product-digit" id="total">${data[value].quantity * data[value].price + " $"}</span>
                                </div>
                            </div>
                        </div>
                        </li>`)
    }

    $("#items-basket").text(count);
    $("#total-price").text(totalPrice + "$");
    if (count > 0) {
        $("#checkout-button").text("Оформление заказа")
    }

    $(".glowing-btn").on("click", function () {
        let button = $("#checkout-button")
        const name = $(this).parent().data("name")
        const price = $(this).parent().data("price")
        const image = $(this).parent().data("image")
        const id = $(this).parent().children("h4").data('product-id')
        let product = {id: {name, price, image, quantity: 1}}
        const sub = `<span class='sub' id='${id}'>-</span>`
        const add = `<span class='add' id='${id}'>+</span>`
        const remove = `<button id='${id}' class='remove'> X </button>`;
        let count = 0
        let store = JSON.parse(localStorage.getItem("data"))
        let data = store === null ? {} : store
        let order;
        if (data[id] === undefined) {
            data[id] = product.id
            order = `<li>${name} - <span>${price}</span>
        ${sub}<span id='quantity' data-product-id='${id}'> 
        ${data[id].quantity} </span>
        ${add}${remove}</li>`;
            $("#list-item").append(order);
            button.text("Оформление заказа")
        } else {
            data[id].quantity += 1
            document.querySelector("[data-product-id='" + id + "']").textContent = " " + data[id].quantity + " ";
        }
        localStorage.setItem("data", JSON.stringify(data))
        for (let value in data) {
            count += data[value].quantity
        }
        totalPrice += price * product.id.quantity

        $(".add").click(function (event) {
            totalPrice = 0
            let product_id = event.target.id
            data[product_id].quantity += 1
            document.querySelector("[data-product-id='" + product_id + "']").textContent =
                " " + data[product_id].quantity + " ";
            for (let value in data) {
                totalPrice += data[value].quantity * data[value].price
            }
            count += 1
            localStorage.setItem('totalPrice', totalPrice)
            localStorage.setItem('count', count)
            localStorage.setItem("data", JSON.stringify(data))
            $("#items-basket").text(count);
            $("#total-price").text(totalPrice + "$")
        });


        $(".sub").click(function (event) {
            totalPrice = 0
            let product_id = event.target.id
            if (data[product_id].quantity > 1) {
                data[product_id].quantity -= 1
                count -= 1
            }
            for (let value in data) {
                totalPrice += data[value].quantity * data[value].price
            }
            document.querySelector("[data-product-id='" + product_id + "']").textContent =
                " " + data[product_id].quantity + " ";
            localStorage.setItem("data", JSON.stringify(data))
            localStorage.setItem('totalPrice', totalPrice)
            localStorage.setItem('count', JSON.stringify(count))
            $("#items-basket").text(count);
            $("#total-price").text(totalPrice + "$");
        });

        $(".remove").on("click", function (event) {
            totalPrice = 0
            let product_id = event.target.id
            count -= data[product_id].quantity
            delete data[product_id]
            for (let value in data) {
                totalPrice += data[value].quantity * data[value].price
            }

            localStorage.setItem('data', JSON.stringify(data))
            localStorage.setItem('count', JSON.stringify(count))
            localStorage.setItem('totalPrice', totalPrice)
            $("#items-basket").text(count);
            $("#total-price").text(totalPrice + "$");
            $(this).parent().remove()
            button.empty()
            if (count > 0) {
                button.text("Оформление заказа")
            }
        });

        localStorage.setItem('count', count)
        localStorage.setItem('totalPrice', totalPrice)
        $("#items-basket").text(count);
        $("#total-price").text(totalPrice + "$");


    });


    $(".add").click(function (event) {
        let product_id = event.target.id
        data[product_id].quantity += 1
        document.querySelector("[data-product-id='" + product_id + "']").textContent = " " + data[product_id].quantity + " ";
        totalPrice += data[product_id].price
        count = JSON.parse(localStorage.getItem('count'))
        count += 1
        localStorage.setItem('totalPrice', totalPrice)
        localStorage.setItem('count', JSON.stringify(count))
        localStorage.setItem("data", JSON.stringify(data))
        $("#items-basket").text(count);
        $("#total-price").text(totalPrice + "$");
    });

    $(".sub").click(function (event) {
        let product_id = event.target.id
        count = JSON.parse(localStorage.getItem('count'))
        if (data[product_id].quantity > 1) {
            data[product_id].quantity -= 1
            count -= 1
            totalPrice -= data[product_id].price
        }
        document.querySelector("[data-product-id='" + product_id + "']").textContent =
            " " + data[product_id].quantity + " ";
        localStorage.setItem("data", JSON.stringify(data))
        localStorage.setItem('totalPrice', totalPrice)
        localStorage.setItem('count', JSON.stringify(count))
        $("#items-basket").text(count);
        $("#total-price").text(totalPrice + "$");
    });


    $(".remove").on("click", function (event) {
        let button = $("#checkout-button")
        let product_id = event.target.id
        count = JSON.parse(localStorage.getItem('count'))
        count -= data[product_id].quantity
        totalPrice -= data[product_id].quantity * data[product_id].price
        delete data[product_id]
        localStorage.setItem('data', JSON.stringify(data))
        localStorage.setItem('count', JSON.stringify(count))
        localStorage.setItem('totalPrice', totalPrice)
        $("#items-basket").text(count);
        $("#total-price").text(totalPrice + "$");
        $(this).parent().remove()
        button.empty()
        if (count > 0) {
            button.text("Оформление заказа")
        }
    });


    if (count === '1') {
        $(".orders-count").text(count + " товар на сумму");
    } else if (count % 10 === 1 && count > 11) {
        $(".orders-count").text(count + " товар на сумму");
    } else if (count < 5 && count > 0) {
        $(".orders-count").text(count + " товара на сумму");
    } else if (count < 21) {
        $(".orders-count").text(count + " товаров на сумму");
    } else if (count % 10 < 5) {
        $(".orders-count").text(count + " товара на сумму");
    } else {
        $(".orders-count").text(count + " товаров на сумму");
    }
    $(".orders-price").text(totalPrice + "$")

    const location_city = localStorage.getItem('city-location')

    function Filter_list_2(value) {
        console.log(value)
        if (!value)
            return $('.post-office-list li').remove()
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'https://api.novaposhta.ua/v2.0/json/',
            data: JSON.stringify({
                modelName: 'Address',
                calledMethod: "getWarehouses",
                methodProperties: {
                    Warehouse: "1",
                    CityName: location_city,
                    FindByString: value,
                },
                apiKey: '263f6663c61b14b1471c0e7972627700'
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            xhrFields: {
                withCredentials: false
            },
            success: function ({data}) {
                $('.post-office-list li').remove()
                $.each(data, function (i, text) {
                    $('.post-office-list').append(`<li><div class="autocomplete-item" data-post-office='№${text.Number}, ${text.ShortAddress}'><span>№${text.Number}, ${text.ShortAddress}</span></div></li>`);
                });
                console.log(data)
            },
        });
    }

    $(".search-delivery").keyup(debounce(e => {
        Filter_list_2(e.target.value);
    }, 500));
});

$("#Btn").on("click", function () {
    $("#myModal").css({'display': 'block'})
})

$(".x-mark").on("click", function () {
    $("#myModal").css({'display': 'none'})
})

const modal = document.getElementById("myModal");

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

const body_content = $('body')

$(".header-location-popular li span").on("click", function () {
    $('.region-post-office').css({'display': 'none'})
    $('.main-location').removeClass("main-location")
    $(this).addClass("main-location")
    $(this).parent().data('main-location', $(this).text());
    $('.location-search input').val($(this).text())
    $('.button-apply').prop('disabled', false).css({
        'color': 'white',
        'background-color': '#00a046',
        'cursor': 'pointer'
    })
    const main_location = $(this).parent().data('main-location')
    localStorage.setItem('location', main_location)
})


$('.button-apply').on("click", function () {
    const main_location = $('.main-location')
    const full_location = main_location.text()
    const city_name = main_location.data('main-location')
    localStorage.setItem('location', full_location)
    localStorage.setItem('city-location', city_name)
    $('.city').text(full_location)
    $('.region').text(full_location)
    $("#myModal").css({'display': 'none'})
    $('.button-apply').prop('disabled', true).css({
        'color': '#a6a5a5',
        'background-color': '#eee',
        'cursor': 'default'
    })
    localStorage.removeItem('number_address')
    $('.button-choice-place').children('span').empty()

    function cityPost(value) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'https://api.novaposhta.ua/v2.0/json/',
            data: JSON.stringify({
                modelName: 'Address',
                calledMethod: "getWarehouses",
                methodProperties: {
                    Warehouse: "1",
                    CityName: city_name,
                    FindByString: value,
                },
                apiKey: '263f6663c61b14b1471c0e7972627700'
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            xhrFields: {
                withCredentials: false
            },
            success: function ({data}) {
                $('.post-office-list li').remove()
                $.each(data, function (i, text) {
                    $('.post-office-list').append(`<li><div class="autocomplete-item" data-post-office='№${text.Number}, ${text.ShortAddress}'><span>№${text.Number}, ${text.ShortAddress}</span></div></li>`);
                });
                console.log(data)
            },
        });
    }

    $(".search-delivery").keyup(debounce(e => {
        cityPost(e.target.value);
    }, 500));
})

const region_location = $('.region-location')

$('.region').text(localStorage.getItem('location'))
region_location.val(localStorage.getItem('location'))

$('.button-choice-place').on("click", function (event) {
    const post_office = $('.post-office')
    if (post_office.css('display') === 'none') {
        post_office.css({'display': 'block'})
        event.preventDefault();
        const n = $(document).height();
        $('html, body').animate({scrollTop: n}, 50);
    } else {
        post_office.css({'display': 'none'})
    }
})
region_location.on("click", function () {
    const region_post_office = $('.region-post-office')
    if (region_post_office.css('display') === 'none') {
        region_post_office.css({'display': 'block'})
    } else {
        region_post_office.css({'display': 'none'})
    }
})

body_content.on("click", '.autocomplete-item', function () {
    const value = $('.button-choice-place span')
    value.text($(this).text())
    const number_address = $(this).text()
    localStorage.setItem('number_address', JSON.stringify(number_address))
    $('.post-office').css({'display': 'none'})
    $('.search-delivery').val("")
    $('.post-office-list li').remove()
})

const number_address = JSON.parse(localStorage.getItem('number_address'))
$('.button-choice-place span').text("Выберите подходящее отделение")
if (number_address !== null) {
    $('.button-choice-place span').text(number_address)
}

body_content.on("click", '.region_autocomplete_item', function () {
    $('.location-search input').val($(this).text())
    $('.main-location').removeClass("main-location")
    $(this).addClass("main-location")
    $('.region-post-office').css({'display': 'none'})
    $('.button-apply').prop('disabled', false).css({
        'color': 'white',
        'background-color': '#00a046',
        'cursor': 'pointer'
    })
    const main_location = $(this).data('main-location')
    localStorage.setItem('location', main_location)
})


function Filter_list(value) {
    if (!value)
        return $('ul .region_autocomplete_item').remove()
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'https://api.novaposhta.ua/v2.0/json/',
        data: JSON.stringify({
            modelName: 'Address',
            calledMethod: 'getSettlements',
            methodProperties: {
                Warehouse: "1",
                FindByString: value,
            },
            apiKey: '263f6663c61b14b1471c0e7972627700'
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        xhrFields: {
            withCredentials: false
        },
        success: function (data) {
            const location_data = data.data
            console.log(location_data)
            $('ul .region_autocomplete_item').remove()
            for (let text in location_data) {
                $('.region-post-office-list').append(`<li><div class="region_autocomplete_item" data-main-location="${location_data[text].Description}"><span>${location_data[text].SettlementTypeDescription} ${location_data[text].Description}, ${location_data[text].AreaDescription}</span></div></li>`)
            }
        },
    });
}

$(".region-location").keyup(debounce(e => {
    Filter_list(e.target.value);
}, 500));


function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this, args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

$('.block-content-payment').append(`<li class="checkout-payment-offline">
                        <div class="block-radio-payment" style="padding-bottom: 10px">
                            <input class="checkout-radio-payment" checked type="radio" style="margin-right: 8px">
                            <label class="checkout-variant-payment"></label>
                            <span class="radio-payment-span">Оплатить при получении</span>
                        </div>
                    </li>`)

// $('#formOrder').submit(function (e) {
//     e.preventDefault();
//     let formData = $(this).serializeArray();
//     console.log(formData)
//     const location = $('#location').text()
//     const postOfficeAddress = $('#postOfficeAddress').text()
//     const amount = $('#amount').text()
//     const orderItems = JSON.parse(localStorage.getItem('data'))
//     formData.push({name: 'location', value: location}, {
//         name: 'postOfficeAddress',
//         value: postOfficeAddress
//     }, {name: 'amount', value: amount}, {name: 'orderItems', value: orderItems})
//     // console.log(formData[8].value['tv3'].name)
//     console.log(formData)
//     formData = $.param(formData)
//     console.log(formData)
//
//     $.ajax({
//         url: 'http://127.0.0.1:8000/checkout',
//         type: 'POST',
//         data: formData,
//         success: function (response) {
//             alert('Your form has been sent successfully.');
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             alert('Your form was not sent successfully.');
//         }
//     });
// });

$('#formOrder').submit(function (e) {
    e.preventDefault();
    let formData = $(this).serializeArray();
    console.log(formData)
    const location = $('#location').text()
    const postOfficeAddress = $('#postOfficeAddress').text()
    const amount = $('#amount').text()
    const orderItems = JSON.parse(localStorage.getItem('data'))
    formData.push({name: 'location', value: location}, {
        name: 'postOfficeAddress',
        value: postOfficeAddress
    }, {name: 'amount', value: amount}, {name: 'orderItems', value: orderItems})
    localStorage.setItem('order', JSON.stringify(formData))
    $(this).css({'display': 'none'})
    let selectPersonInfo = $('.personInfo')
    if (selectPersonInfo.is(':empty')) {
        selectPersonInfo.css({'border': '1px solid #00a046', 'padding': '10px 0'}).append(`<i class="bi fa-2x bi-person-circle" id="personCircle"></i>
         <div class="userInfo"><div><span> ${formData[1].value} ${formData[2].value}</span></div>
         <div><span>${formData[4].value}</span></div></div>
         <i class="bi fa-lg bi-pencil" id="pencilEdit"></i>
    `)
    } else {
        $('.blockPersonInfo').css({'display': 'block'})
        selectPersonInfo.empty()
        selectPersonInfo.css({'border': '1px solid #00a046', 'padding': '10px 0'}).append(`<i class="bi fa-2x bi-person-circle" id="personCircle"></i>
         <div class="userInfo"><div><span> ${formData[1].value} ${formData[2].value}</span></div>
         <div><span>${formData[4].value}</span></div></div>
         <i class="bi fa-lg bi-pencil" id="pencilEdit"></i>
    `)
    }
});

$('.button-checkout').on('click', function (e) {
    e.preventDefault();
    let formData = JSON.parse(localStorage.getItem('order'))
    formData[8] = {name: 'orderItems', value: JSON.stringify(formData[8].value)}
    console.log(formData)
    formData = $.param(formData)
    // console.log(formData)
    $.ajax({
        url: 'http://127.0.0.1:8000/checkout',
        // url: "{% url 'checkout' %}",
        type: 'POST',
        data: formData,
        success: function (response) {
            alert('Your form has been sent successfully.');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Your form was not sent successfully.');
        }
    });
})

let order = JSON.parse(localStorage.getItem('order'))
if (order !== null) {
    $('input[name="firstname"]').val(order[1].value)
    $('input[name="lastname"]').val(order[2].value)
    $('input[name="email"]').val(order[3].value)
    $('input[name="phone_number"]').val(order[4].value)
}

$('.personInfo').on('click', function () {
    $('.blockPersonInfo').css({'display': 'none'})
    $('#formOrder').css({'display': 'block'})
})
