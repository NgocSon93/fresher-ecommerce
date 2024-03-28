<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import type { Page } from '~/types/pages'

const authStore = useAuthStore()
const commonStore = useCommonStore()

const socials = [
  { name: 'facebook', url: 'https://www.facebook.com/hybrid.technologies.co.ltd', active: true },
  { name: 'twitter', url: '#', active: false },
  { name: 'instagram', url: 'https://www.instagram.com/hybrid.technologies.co.ltd/', active: true },
  { name: 'youtube', url: 'https://www.youtube.com/channel/UCW5D44CKB61sQk15Ne2akEQ', active: true },
  { name: 'linkedin', url: 'https://www.linkedin.com/company/hybrid-technologies-co-ltd/', active: true },
]
const companyList = [
  { name: 'About Us', url: '/about', active: true },
  { name: 'Team Member', url: '#', active: false },
  { name: 'Career', url: '#', active: false },
  { name: 'Contact Us', url: '/contact', active: true },
  { name: 'Affilate', url: '#', active: false },
  { name: 'Order History', url: '#', active: false },
]
const myAccountList = [
  { name: 'Sign In', url: '/login', active: !authStore.isAuthenticated },
  { name: 'Track My Order', url: '/profile', active: true },
  { name: 'View Cart', url: '/cart', active: true },
  { name: 'My Wishlist', url: '/wishlist', active: true },
  { name: 'Help', url: '#', active: false },
  { name: 'Privacy Policy', url: '#', active: false },
]

const email = ref<string>('')
const servicePages = computed<Page[]>(() => commonStore.pages ?? [])

;(async function getPages() {
  if (!commonStore.pages.length)
    commonStore.fetchAllPages()
})()

async function handleSubscribe() {
  if (email.value && ValidateHelper.isValidEmail(email.value)) {
    const { error } = await useCustomFetch('/subscribers', {
      method: 'POST',
      body: {
        email: email.value,
      },
    })
    if (error.value)
      toast.error('This email has already been taken')
    else
      toast.success('You have successfully subscribed to our newsletter')
  }
  else {
    toast.error('Please enter a valid email address')
  }
  email.value = ''
}
</script>

<template>
  <!-- Start of Footer -->
  <footer class="footer">
    <div class="footer-newsletter bg-primary">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-xl-5 col-lg-6">
            <div class="icon-box icon-box-side text-white">
              <div class="icon-box-icon d-inline-flex">
                <i class="w-icon-envelop3" />
              </div>
              <div class="icon-box-content">
                <h4 class="icon-box-title text-white text-uppercase font-weight-bold">
                  Subscribe To
                  Our Newsletter
                </h4>
                <p class="text-white">
                  Get all the latest information on Events, Sales and Offers.
                </p>
              </div>
            </div>
          </div>
          <div class="col-xl-7 col-lg-6 col-md-9 mt-4 mt-lg-0 ">
            <form
              action="#" method="get"
              class="input-wrapper input-wrapper-inline input-wrapper-rounded"
            >
              <input
                id="email"
                v-model="email" type="email" class="form-control mr-2 bg-white" name="email"
                placeholder="Your E-mail Address"
              >
              <button class="btn btn-dark btn-rounded" @click.prevent="handleSubscribe">
                Subscribe<i
                  class="w-icon-long-arrow-right"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="footer-top">
        <div class="row">
          <div class="col-lg-4 col-sm-6">
            <div class="widget widget-about">
              <NuxtLink to="/" class="logo-footer">
                <NuxtImg
                  src="/wolmart_logo.png" alt="logo-footer" width="144"
                  height="45"
                />
              </NuxtLink>
              <div class="widget-body">
                <p class="widget-about-title">
                  Got Question? Call us 24/7
                </p>
                <NuxtLink to="tel:18005707777" class="widget-about-call">
                  1-800-570-7777
                </NuxtLink>
                <p class="widget-about-desc">
                  Register now to get updates on pronot get up icons
                  & coupons ster now toon.
                </p>

                <div class="social-icons social-icons-colored">
                  <template v-for="social in socials" :key="social.name">
                    <NuxtLink
                      v-if="social.active"
                      :to="social.url"
                      :class="`social-icon social-${social.name} w-icon-${social.name} fa-${social.name}`"
                    />
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="widget">
              <h3 class="widget-title">
                Company
              </h3>
              <ul class="widget-body">
                <template v-for="company in companyList" :key="company.name">
                  <li v-if="company.active">
                    <NuxtLink :to="company.url">
                      {{ company.name }}
                    </NuxtLink>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="widget">
              <h4 class="widget-title">
                My Account
              </h4>
              <ul class="widget-body">
                <template v-for="account in myAccountList" :key="account.name">
                  <li v-if="account.active">
                    <NuxtLink :to="account.url">
                      {{ account.name }}
                    </NuxtLink>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="widget">
              <h4 class="widget-title">
                Customer Service
              </h4>
              <ul class="widget-body">
                <template v-for="service in servicePages" :key="service.id">
                  <li>
                    <NuxtLink :to="`/service/${service.slug}`">
                      {{ service.name }}
                    </NuxtLink>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-left">
          <p class="copyright">
            Copyright © 2024 Hybrid Technologies <b>HAN Talent Academy Team</b>.
          </p>
        </div>
        <div class="footer-right">
          <span class="payment-label mr-lg-8">We're using safe payment for</span>
          <figure class="payment">
            <NuxtImg src="/payment.png" alt="payment" width="159" height="25" />
          </figure>
        </div>
      </div>
    </div>
  </footer>
  <!-- End of Footer -->
</template>
