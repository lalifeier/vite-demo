<template>
  <Menu :menu="menu"></Menu>
</template>
<script setup lang="ts">
  import Menu from './components/Menu.vue'

  const menu = [
    {
      text: 'dashboard',
      key: '',
      items: [
        {
          icon: 'mdi-view-dashboard-outline',
          key: 'menu.dashboard',
          text: 'Dashboard',
          link: '/dashboard/analytics'
        }
      ]
    },
    {
      text: 'Landing Pages',
      items: [
        {
          icon: 'mdi-airplane-landing',
          key: 'menu.landingPage',
          text: 'Landing Page',
          link: '/landing'
        },
        {
          icon: 'mdi-cash-usd-outline',
          key: 'menu.pricingPage',
          text: 'Pricing Page',
          link: '/landing/pricing'
        }
      ]
    },
    {
      text: 'Other',
      key: 'menu.others',
      children: [
        { icon: 'mdi-file-outline', key: 'menu.blank', text: 'Blank Page', link: '/blank' },
        {
          key: 'menu.levels',
          text: 'Menu Levels',
          children: [
            { text: 'Menu Levels 2.1' },
            {
              text: 'Menu Levels 2.2',
              children: [{ text: 'Menu Levels 3.1' }, { text: 'Menu Levels 3.2' }]
            }
          ]
        },
        { key: 'menu.disabled', text: 'Menu Disabled', disabled: true }
      ]
    }
  ]
</script>
