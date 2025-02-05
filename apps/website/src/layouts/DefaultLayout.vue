<script setup>
    import AppFooter from "@/components/AppFooter.vue";
    import AppHeader from "@/components/AppHeader.vue";
    import AppNavigation from "@/components/AppNavigation.vue";
</script>
<template>
    <div>
        <header>
            <AppHeader />
        </header>
        <main>
            <slot />
        </main>
        <nav class="section section-brand">
            <AppNavigation />
        </nav>
        <footer>
            <AppFooter />
        </footer>
    </div>
</template>
<style lang="css" scoped>
header, footer, nav {
    padding-left: 80px;
    padding-right: 80px;
}

header {
    grid-area: header;
    padding-top: 55px;
    text-align: center;
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
}
nav {
    background-color: rgb(0, 100, 134);
    grid-area: navigation;
}

footer {
    background-color: rgb(0, 100, 134);
    grid-area: footer;
    padding: 30px 0 20px;
    text-align: center;
}
</style>