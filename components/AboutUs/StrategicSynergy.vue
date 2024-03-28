<script setup>
const accordions = ref([
  {
    title: 'Customer Service',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp orincid idunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulp utate eu sceler isque felis. Vel pretium.',
    id: 0,
    isOpen: true,
  },
  {
    title: 'Online Consultation',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp orincid idunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulp utate eu sceler isque felis. Vel pretium.',
    id: 1,
    isOpen: false,
  },
  {
    title: 'Sales Management',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp orincid idunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulp utate eu sceler isque felis. Vel pretium.',
    id: 2,
    isOpen: false,
  },
])
function toggleAccordion(index) {
  accordions.value.forEach((accordion, i) => {
    if (i === index)
      accordion.isOpen = !accordion.isOpen
    else
      accordion.isOpen = false
  })
}
</script>

<template>
  <!-- Start of Page Content -->
  <div class="container mt-10 pt-8">
    <section class="introduce mb-10 pb-10">
      <h2 class="title title-center">
        We’re Devoted Marketing<br>Consultants Helping Your Business Grow
      </h2>
      <p class=" mx-auto text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        labore et dolore magna aliqua. Venenatis tellu metus
      </p>
      <figure class="br-lg">
        <NuxtImg
          src="/products/2.webp" alt="Banner" width="1240" height="540" class="rounded-2xl"
          style="background-color: #D0C1AE;"
        />
      </figure>
    </section>

    <section class="customer-service  mb-7">
      <div class="row align-items-center">
        <div class="col-md-6 pr-lg-8 mb-8">
          <h2 class="title text-left">
            We Provide Continuous &amp; Kind Service for Customers
          </h2>
          <div
            v-for="(accordion, index) in accordions" :key="accordion.id"
            class="accordion accordion-simple accordion-plus"
          >
            <div class="card border-no" @click="toggleAccordion(index)">
              <div class="card-header">
                <NuxtLink :class="{ isactive: accordion.isOpen }">
                  {{ accordion.title }}
                </NuxtLink>
                <Icon name="ic:twotone-keyboard-arrow-up" class="mr-4" />
              </div>
              <div v-if="accordion.isOpen" id="collapse1" class="card-body expanded">
                <p class="mb-0">
                  {{ accordion.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-8">
          <figure class="br-lg">
            <NuxtImg
              src="/products/5.webp" alt="Banner"
              width="610" height="500" style="background-color: #CECECC;"
            />
          </figure>
        </div>
      </div>
    </section>

    <section class="count-section mb-10 mt-24 pb-5">
      <div class="swiper-container swiper-theme">
        <div class="swiper-wrapper row ">
          <div class="swiper-slide counter-wrap col-md-4">
            <div class="counter text-center">
              <span class="count-to" data-to="15">15</span>
              <span>M+</span>
              <h4 class="title title-center">
                Products For Sale
              </h4>
              <p>
                Diam maecenas ultricies mi eget mauris<br>
                Nibh tellus molestie nunc non
              </p>
            </div>
          </div>
          <div class="swiper-slide counter-wrap col-md-4">
            <div class="counter text-center">
              <span>$</span>
              <span class="count-to" data-to="25">25</span>
              <span>B+</span>
              <h4 class="title title-center">
                Community Earnings
              </h4>
              <p>
                Diam maecenas ultricies mi eget mauris<br>
                Nibh tellus molestie nunc non
              </p>
            </div>
          </div>
          <div class="swiper-slide counter-wrap col-md-4">
            <div class="counter text-center">
              <span class="count-to" data-to="100">100</span>
              <span>M+</span>
              <h4 class="title title-center">
                Growing Buyers
              </h4>
              <p>
                Diam maecenas ultricies mi eget mauris<br>
                Nibh tellus molestie nunc non
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.introduce .title {
    margin-bottom: 1.3rem;
    font-size: 4rem !important;
}
.customer-service .text-left{
    font-size: 3.4rem !important;
}
.title-center {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    position: relative;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    margin-bottom: 1.7rem;
    font-weight: 700;
    line-height: 1.2;
}
a {
  color: inherit;
}
.introduce p {
    margin-bottom: 4.3rem;
    max-width: 57rem;
}
.text-center {
    text-align: center !important;
}
.mx-auto {
    margin-left: auto !important;
    margin-right: auto !important;
}

p {
    font-size: 1.4rem;
    line-height: 1.86;
}
.align-items-center {
    -webkit-box-align: center !important;
    -ms-flex-align: center !important;
    align-items: center !important;
}

.row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-left: -10px;
    margin-right: -10px;
}
.pr-lg-8 {
    padding-right: 4rem !important;
}

.mb-8 {
    margin-bottom: 4rem !important;
}
.accordion-simple .card {
    border-top: 1px solid #eee;
}
.accordion-simple {
  transition: transform 4s;
}

.border-no {
    border: none !important;
}
.customer-service .card-header {
    font-size: 1.8rem;
}

.card {
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee !important;
}

.card-header {
    color: #333;
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.5;
    display: flex;
    justify-content: space-between;

    &:hover {
      color: #336699;
      cursor: pointer;
    }
}
.accordion-simple .card-body {
    padding-top: 0;
}

.customer-service p {
    font-size: 1.4rem;
    color: #333;
}

.card-body p {
    font-size: 1.3rem;
    line-height: 2;
}

.mb-10 {
    margin-bottom: 5rem !important;
}
.pb-5 {
    padding-bottom: 2.5rem !important;
}

.swiper-wrapper {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    box-sizing: content-box;
}
.swiper-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    transition-property: transform;
    padding: 0;
}
.text-center {
    text-align: center !important;
}
.counter span {
    font-size: 6rem;
    font-weight: 800;
    color: #ccc;
    letter-spacing: -0.05em;
    line-height: 1.54;
}
.isactive {
  color: #336699;
}
</style>
