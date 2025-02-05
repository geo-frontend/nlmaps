<template>
    <div class="container">
    <ul class="usps">
        <li class="usps-item">
            <article class="usp usp-precise">
                <h2 class="heading usp-heading">De meest gedetailleerde kaart van Nederland</h2>
                <p class="usp-description">Zéér nauwkeurige weergave door middel van actuele topografische gegevens.</p>
            </article>
        </li>
        <li class="usps-item">
            <article class="usp usp-official">
                <h2 class="heading usp-heading">Op basis van officiële overheidsinformatie</h2>
                <p class="usp-description">Altijd actuele weergave door aanvulling en validatie met de laatste officiële overheids informatie van het Kadaster.</p>
            </article>
        </li>
        <li class="usps-item">
            <article class="usp usp-embedding">
                <h2 class="heading usp-heading">Makkelijk te integreren met tal van services</h2>
                <p class="usp-description">Ondersteuning voor Leaflet, OpenLayers &amp; MapLibre GL JS. Mis je een dienst? <a href="https://forum.pdok.nl/c/applicaties-en-diensten/nl-maps">Laat het ons weten</a> of <a href="https://github.com/geo-frontend/nlmaps/">dien je eigen voorbeeldcode op Github in</a>.</p>
            </article>
        </li>
    </ul>
</div>
</template>
<style lang="css">
.container {
    text-align: center;
    max-width: 84em;
    margin: 0 auto;
    padding: 0 20px;
}
ul {
    display: flex;
    flex-wrap: wrap;
    max-width: 84em;
}

.usps {
    margin: 0;
    padding: 0;
    list-style: none;
}

.usps-item {
    padding: 0 0 16px;
    text-align: left;
    list-style: none;
    width: 30%;
}

.usp {
    position: relative;
    margin: 0 auto;
    padding: 0 0 0 100px;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 64px;
        height: 64px;
        border-radius: 100%;
        background-color: #6c62a6;
    }

    &:after {
        content:'\e837';
        font-family: 'fontello';
        position: absolute;
        top: 0;
        left: 0;
        width: 64px;
        height: 64px;
        margin: 0;
        font-size: 32px;
        line-height: 64px;
        text-align: center;
        color: #fff;
    }
}

.usp-official {
    &:after {
        content: '\e839';
        font-family: 'fontello';
    }
}

.usp-embedding {
    &:after {
        content: '\e838';
        font-family: 'fontello';
    }
}

</style>