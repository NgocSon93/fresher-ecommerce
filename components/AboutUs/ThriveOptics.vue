<template>
  <section class="boost-section pt-14 pb-10">
    <div class="container mt-10 mb-9">
      <div class="flex row align-items-center mb-10">
        <div class="col-md-6 mb-8">
          <figure class="br-lg">
            <NuxtImg
              src="/products/4.webp" alt="Banner" width="610" height="450"
              style="background-color: #9E9DA2;"
            />
          </figure>
        </div>
        <div class="col-md-6 pl-lg-8 mb-8 ">
          <h4 class="title text-left">
            We Boost Our Clients’ Bottom
            Line by Optimizing Their Growth Potential
          </h4>
          <p class="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Venenatis tellus in.
            metus vulputate eu scelerisque felis. Vel pretium lectus qua .
            Arpis massa. Nunc id cursus metus ididunt ut labore metus vulputate episcing.
          </p>
          <NuxtLink href="#" class="btn btn-dark btn-rounded button-ourstore">
            Visit Our Store
          </NuxtLink>
        </div>
      </div>
      <div class="awards-wrapper">
        <h4 class="title text-center font-weight-bold mb-10 pb-1 ls-25">
          Awards
        </h4>
        <div class="swiper-container swiper-theme">
          <div class="swiper-wrapper row cols-xl-4 cols-lg-3 cols-md-2 cols-1">
            <div class="swiper-slide image-box-wrapper">
              <div class="image-box text-center">
                <figure>
                  <NuxtImg src="products/1.webp" alt="Award Image" width="109" height="105" />
                </figure>
                <p class="">
                  Winner Seo Master MAGT<br>
                  Smart Start Award 2018
                </p>
              </div>
            </div>
            <div class="swiper-slide image-box-wrapper">
              <div class="image-box text-center">
                <figure>
                  <NuxtImg src="products/2.webp" alt="Award Image" width="109" height="105" />
                </figure>
                <p class="">
                  Top Social Media Agencies<br>
                  Next Partner 2019
                </p>
              </div>
            </div>
            <div class="swiper-slide image-box-wrapper">
              <div class="image-box text-center">
                <figure>
                  <NuxtImg src="products/3.webp" alt="Award Image" width="109" height="105" />
                </figure>
                <p class="">
                  5 Fastest Growing Abstract<br>
                  Solution Providers 2020
                </p>
              </div>
            </div>
            <div class="swiper-slide image-box-wrapper">
              <div class="image-box text-center">
                <figure>
                  <NuxtImg src="products/4.webp" alt="Award Image" width="109" height="105" />
                </figure>
                <p class="">
                  National Excellence Agencie<br>
                  Award Winner 2021
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.awards-wrapper .title {
  text-align: center;
  font-size: 3rem;
  line-height: 1.25;
}
.boost-section {
  background-color: #FAFAFB;
}
.boost-section .title {
  line-height: 1.25;
  margin-bottom: 1.3rem;
}

.boost-section .title {
  font-size: 3.4rem;
}

.boost-section .btn {
  padding: 1.23em 2.35em;
}

.title {
  display: block;
}

.text-center {
  text-align: center !important;
}

.swiper-slide {
  padding: 0;
}
.swiper-slide img {
  display: block;
  width: 100%;
}

.image-box img {
  margin: auto;
  width: 110px !important;
  height: 110px !important;
  border-radius: 1rem;
  max-width: 100%;
  margin-bottom: 1rem;
  -o-object-fit: cover;
  object-fit: cover;
  vertical-align: middle;
}
.awards-wrapper p {
    margin-bottom: 0;
    font-size: 2rem;
    color: #333;
    line-height: 1.6;
    letter-spacing: -0.025em;
}
</style>
