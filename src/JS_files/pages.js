import { toggleSubmenu, revealSections } from './main.js';

const previousBtn = document.querySelector('.previous__btn'),
    nextBtn = document.querySelector('.next__btn'),
    pageLinks = document.querySelectorAll('.pagination__link');

toggleSubmenu();
revealSections();

// *************************************

class Pagination {
    currentPage;

    constructor() {
        this.renderPage();
    }

    renderPage() {
        if (Number.parseInt(this.getStorageItem()) === 1) {
            previousBtn.ariaDisabled = true;
            previousBtn.classList.add('page__link--disabled');
        }

        this.currentPage = this.getStorageItem();

        if (this.currentPage === null) {
            this.currentPage = 1; //which means nothing has been set, hence the default value.
            this.setStorageItem();
        }

        pageLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.currentPage = link.dataset.page;
                link.href = `/src/products/birthday-cakes/page_${this.currentPage}.html`;
                this.updateLink();
                this.setStorageItem();
            });
        });

        this.updateLink();

        previousBtn.addEventListener('click', this.loadPreviousPage.bind(this));

        this.updateLink();

        nextBtn.addEventListener('click', this.loadnextPage.bind(this));
        this.updateLink();
    }

    updateLink() {
        pageLinks.forEach(link =>
            link.classList.remove('pagination__link--active')
        );
        pageLinks[this.currentPage - 1].classList.add(
            'pagination__link--active'
        );
    }

    loadPreviousPage() {
        previousBtn.href = `/src/products/birthday-cakes/page_${
            Number.parseInt(this.getStorageItem()) - 1
        }.html`;

        this.updateLink();

        this.currentPage = Number.parseInt(this.getStorageItem()) - 1;

        this.setStorageItem();
    }

    loadnextPage() {
        nextBtn.href = `/src/products/birthday-cakes/page_${
            Number.parseInt(this.getStorageItem()) + 1
        }.html`;

        this.updateLink();

        this.currentPage = Number.parseInt(this.getStorageItem()) + 1;

        this.setStorageItem();
    }

    setStorageItem() {
        return sessionStorage.setItem('currentPage', this.currentPage);
    }

    getStorageItem() {
        return sessionStorage.getItem('currentPage');
    }
}

const pagination = new Pagination();
