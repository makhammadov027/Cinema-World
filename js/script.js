window.addEventListener('DOMContentLoaded', () => { // bu qatordagi kod vazifasi: aval html css fayllari yuklanib olingandan keyin js faylni ishga tushiradi

    const tabsParent = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        loader = document.querySelector('.loader')



    // Loader: 

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);

    /* Tabs: elementlarni yashirib turish uchun funksiya */

    const hideTabContent = () => {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    /* elementlarni ko'rsatish uchun funksiya */

    const showTabContent = (index = 0) => {
        tabsContent[index].classList.add('show', 'fade');
        tabsContent[index].classList.remove('hide');
        tabs[index].classList.add('tabheader__item_active');
    }


    /* funksiyalarni chaqirish */
    hideTabContent();
    showTabContent();


    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabContent()
                    showTabContent(index)
                }
            })
        }
    })

    // Date:

    const deadLine = '2023-12-31'

    const getTimeRemaining = endTime => {

        let days, hours, minutes, seconds;
        const timer = Date.parse(endTime) - Date.parse(new Date());

        if (timer <= 0) {
            days = 0,
                hours = 0,
                minutes = 0,
                seconds = 0
        } else if (days > 999) {
            days.classList.add('span');
        }
        else {
            days = Math.floor(timer / (1000 * 60 * 60 * 24)),
                hours = Math.floor((timer / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((timer / (1000 / 60)) % 60),
                seconds = Math.floor((timer / 1000) % 60);
        }

        return { days, timer, hours, minutes, seconds };
    }

    const getZero = number => {
        if (number >= 0 && number < 10) {`
            return 0${number};
        `
    } else {
            return number;
        }
    }

    const setClock = (selector, endTime) => {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds')
        timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const time = getTimeRemaining(endTime);

            days.innerHTML = getZero(time.days);
            hours.innerHTML = getZero(time.hours);
            minutes.innerHTML = getZero(time.minutes);
            seconds.innerHTML = getZero(time.seconds);

            if (time.timer <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);


    // Modal: 
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');


    const modalOpen = () => {
        // modal.classList.toggle('show');
        modal.classList.add('show');
        modal.classList.remove('hide');
        //modal.style.display='block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId)
    }

const modalClose = () => {
        //modal.classList.toggle('hide');
        modal.classList.add('hide');
        modal.classList.remove('show');
        //modal.style.display = 'none'
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', modalOpen)
    })

    modalCloseBtn.addEventListener('click', modalClose)

    modal.addEventListener('click', (event) => {
        if (event.target == modal) {
            modalClose();
        }
    })

    // Bu qatordagi kod agar "Esc" klavishi bosilsa modal oynasi yopiladi
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            modalClose();
        }
    })

    // belgilangan vaqt ichida modal ochish
    const modalTimerId = setTimeout(modalOpen, 3000)

    // user sahifaning oxiriga kelganda modalni automatik ochish
    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1) {
            modalOpen();
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // Class yordamida Cardlarni dinamik ko'rsatish

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src,
            this.alt = alt,
            this.title = title,
            this.desc = description,
            this.classes = classes,
            this.parent = document.querySelector(parentSelector)
            this.price = price,
            this.transfer = 11000,
            this.changeToUzs()
        }

        changeToUzs() {
            this.price = this.price * this.transfer
        }

        render() {

            const element = document.createElement('div')

            if(this.classes.length === 0){
                this.element = 'menu__item'
                element.classList.add(this.element)
            }else{
                this.classes.forEach(classname => element.classList.add(classname))
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt} />
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.desc}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Price:</div>
                        <div class="menu__item-total"><span>${this.price}</span> uzs/month</div>
                    </div>
            `

            this.parent.append(element)
        }
    }

    new MenuCard(
        "../images/tabs/1.png",
        "vegy",
        'Plan "Usual"',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        10,
        '.menu .container',
        'menu__item'
    ).render()

    new MenuCard(
        "../images/tabs/2.jpg",
        "Premium",
        'Plan "Premium"',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        15,
        '.menu .container',
        'menu__item'

    ).render()

    new MenuCard(
        "../images/tabs/3.jpg",
        "VIP",
        'Plan "VIP"',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditate beatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.',
        18,
        '.menu .container',
        'menu__item'
    ).render()


})