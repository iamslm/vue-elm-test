<template>
    <header>
        哇哈哈哈哈{{signinUp}}
        <slot name="logo" ></slot>
    </header>
</template>

<script>
export default {
    props: ['signinUp'],
}
</script>