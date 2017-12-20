import $ from 'jquery';
import { markdown } from 'markdown';

export default class Docs {
    constructor(client, url, selector = '.js-docs') {
        this.selector = selector;
        this.$docs = $(this.selector);

        if ( !this.$docs.length ) {
            return;
        }

        if ( !url || !client ) {
            console.error('please provide a client and a docsUrl in .md format');
            return;
        }

        this.url = url;
        this.client = client;

        this.getDocs();
    }

    getDocs() {
        $.get(`https://raw.githubusercontent.com/${this.client}master/${this.url}`, (response) => {
            const content = markdown.toHTML(response);

            this.$docs
                .append(content)
                .find('h2').each((index, h2) => {
                    const $h2 = $(h2);
                    let text = $h2.text();
                    text = text.toLowerCase().replace(/ /g, '-').replace(/\'/g, '');

                    $h2.attr('id', text);
                });
        }).fail(() => {
            this.$docs.html(`<p><h2>Er is iets fout gegaan bij het binnenhalen van de documentatie.</h2> Bekijk de documentatie op:<br/> <a href="https://github.com/${this.client}">https://github.com/${this.client}</a></p>`);
        });
    }
}
