import $ from 'jquery';

export default class Forum {
    constructor(forum, category, selector = '.js-forum') {
        this.selector = selector;
        this.$forum = $(this.selector);
        this.topicAmount = 5;

        if ( !this.$forum.length ) {
            return;
        }

        if ( !forum || !category ) {
            console.error('please provide a forumUrl and category(forumUrl, category)');
            return;
        }

        this.forum = forum;
        this.category = category;
        const searchQuery = `#${this.category} order:latest`;
        this.searchUrl = `${this.forum}/search.json?q=${encodeURIComponent(searchQuery)}`;

        this.getData();
    }

    getData() {
        let xhr = new XMLHttpRequest(),
            method = 'GET';

        xhr.onload = () => {
            this.setData(JSON.parse(xhr.responseText));
        };

        xhr.onerror = () => {
            console.error('There was an error!');
        };

        if ( 'withCredentials' in xhr ) {
            // Check if the XMLHttpRequest object has a 'withCredentials' property.
            // 'withCredentials' only exists on XMLHTTPRequest2 objects.
            xhr.open(method, this.searchUrl, true);
        } else if ( typeof XDomainRequest !== 'undefined' ) {
            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, this.searchUrl);
        } else {
            // Otherwise, CORS is not supported by the browser.
            xhr = null;
        }

        if ( !xhr ) {
            this.$forum.closest('.section').remove();
            console.error('CORS not supported!');
        }

        xhr.send();
    }

    setData(data) {
        const itemTemplate = $('#forum-item').text(),
              topics = data.topics;

        this.$forum.empty();

        if ( topics.length ) {
            for ( let i in topics.slice(0, this.topicAmount) ) {
                const topic = topics[i];

                let item = itemTemplate;

                item = item.replace(/{link}/g, `${this.forum}/t/${topic.slug}/${topic.id}`);
                item = item.replace(/{title}/g, topic.fancy_title);
                item = item.replace(/{comments}/g, topic.posts_count);
                item = item.replace(/{likes}/g, topic.like_count);
                item = item.replace(/{date}/g, this.formatDate(topic.bumped_at));

                this.$forum.append(item);
            }

            $(`${this.selector}-link`).attr('href', `${this.forum}/c/${this.category}`);
        }
    }

    formatDate(date) {
        const monthNames = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
        let d = new Date(date),
        minutes = '' + (d.getMinutes()),
        hours = '' + (d.getHours()),
        month = d.getMonth(),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (hours.length < 2) hours = '0' + hours;
        if (minutes.length < 2) minutes = '0' + minutes;
        return `${day} ${monthNames[month]} ${year} om ${[hours, minutes].join(':')}`;
    }
}
