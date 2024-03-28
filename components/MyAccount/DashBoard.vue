<script setup>
import { defineEmits } from 'vue'

const props = defineProps(['profile'])
const emit = defineEmits(['updateActive', 'logout'])

// const userProfile = computed(() => props.profile ? props.profile : { name: 'Jone Doe' })
const userProfile = computed(() => props.profile)

function updateActive(tabName) {
  emit('updateActive', { name: tabName })
}
function emitLogout() {
  emit('logout')
}
</script>

<template>
  <div id="dashboard" class="tab-pane active">
    <p v-if="userProfile" class="greeting">
      Hello
      <span class="text-dark font-semibold">{{ userProfile.name }}</span>
      (not
      <span class="text-dark font-semibold">{{ userProfile.name }}</span>
      ?
      <NuxtLink to="" class="logout hover-link text-[#336699] cursor-pointer" @click="emitLogout">
        Log out
      </NuxtLink>)
    </p>
    <p class="mb-4 text-[#666]">
      From your account dashboard you can view your
      <NuxtLink to="" class="text-[#336699] hover-link link-to-tab" @click="updateActive('orders')">
        recent orders
      </NuxtLink>
      , manage your
      <NuxtLink to="" class="text-[#336699] hover-link link-to-tab" @click="updateActive('address')">
        shipping and billing addresses
      </NuxtLink>
      , and
      <NuxtLink to="" class="text-[#336699] hover-link link-to-tab" @click="updateActive('account')">
        edit your password and account details.
      </NuxtLink>
    </p>
    <div class="row">
      <div class="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
        <NuxtLink to="#orders" class="link-to-tab" @click="updateActive('orders')">
          <div class="icon-box text-center">
            <span class="icon-box-icon icon-orders">
              <i class="w-icon-orders" />
            </span>
            <div class="icon-box-content">
              <p class="text-uppercase mb-0">
                Orders
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
        <NuxtLink to="#paymentMethod" class="link-to-tab" @click="updateActive('paymentMethods')">
          <div class="icon-box text-center">
            <span class="icon-box-icon icon-download">
              <Icon name="fluent:payment-28-regular" />
            </span>
            <div class="icon-box-content">
              <p class="text-uppercase mb-0">
                Payment Methods
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
        <NuxtLink to="#addresses" class="link-to-tab" @click="updateActive('address')">
          <div class="icon-box text-center">
            <span class="icon-box-icon icon-address">
              <i class="w-icon-map-marker" />
            </span>
            <div class="icon-box-content">
              <p class="text-uppercase mb-0">
                Addresses
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
        <NuxtLink to="#account-details" class="link-to-tab" @click="updateActive('account')">
          <div class="icon-box text-center">
            <span class="icon-box-icon icon-account">
              <i class="w-icon-user" />
            </span>
            <div class="icon-box-content">
              <p class="text-uppercase mb-0">
                Account Details
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
        <NuxtLink to="/wishlist" class="link-to-tab">
          <div class="icon-box text-center">
            <span class="icon-box-icon icon-wishlist">
              <i class="w-icon-heart" />
            </span>
            <div class="icon-box-content">
              <p class="text-uppercase mb-0">
                Wishlist
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
        <NuxtLink to="" class="link-to-tab" @click="emitLogout">
          <div class="icon-box text-center">
            <span class="icon-box-icon icon-logout">
              <i class="w-icon-logout" />
            </span>
            <div class="icon-box-content">
              <p class="text-uppercase mb-0">
                Logout
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab-pane {
  font-size: 1.3rem;
  line-height: 1.7;
  padding: 1.3rem 0;
  color: #666;

  & p.greeting {
    font-size: 1.6rem;
    line-height: 1.8;
  }

  & p {
      font-size: 1.4rem;
      line-height: 1.8;

    & .hover-link:hover {
      color: #336699;
      text-decoration: underline;
      cursor: pointer;
    }
    }

  & .icon-box {
    padding: 4rem 2rem;
    border: 1px solid #eee;
    border-radius: 3px;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;

    &:hover {
      -webkit-box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
      color: #336699;

      & .icon-box-icon i{
        color: #336699;
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
      }
      & .icon-box-icon svg{
        color: #336699;
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
      }

      & .icon-box-content p {
        color: #336699;
        text-decoration: underline;
      }
    }

    & .icon-box-icon {
      display: inline-block;
      margin-bottom: 1.9rem;

      & i, svg {
        display: block;
        font-size: 6rem;
        color: #333;
        -webkit-transition: -webkit-transform 0.4s;
        transition: -webkit-transform 0.4s;
        transition: transform 0.4s;
        transition: transform 0.4s, -webkit-transform 0.4s;
      }
    }
  }
}
</style>
