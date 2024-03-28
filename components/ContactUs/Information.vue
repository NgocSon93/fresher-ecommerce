<script setup>
const commonStore = useCommonStore()

const listContact = ref()

async function getListContacts() {
  commonStore.setIsLoading(true)
  const { data } = await useCustomFetch(`contacts`)
  if (data.value)
    listContact.value = data.value.data
  commonStore.setIsLoading(false)
}
getListContacts()
</script>

<template>
  <section class="content-title-section mb-10">
    <h3 class="title title-center mb-3">
      Contact
      Information
    </h3>
    <p class="text-center">
      Lorem ipsum dolor sit amet,
      consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut
    </p>
  </section>
  <!-- End of Contact Title Section -->
  <section class="contact-information-section mb-10">
    <div class="swiper-container swiper-theme ">
      <div class="swiper-wrapper row cols-xl-4 cols-md-3 cols-sm-2 cols-1">
        <div v-for="contact in listContact" :key="contact.id" class="swiper-slide icon-box text-center icon-box-primary">
          <div class="icon-infor">
            <span v-if="contact.name === 'E-mail Address'" class="icon-box-icon icon-email">
              <i class="w-icon-envelop-closed" />
            </span>
            <span v-else-if="contact.name === 'Phone Number'" class="icon-box-icon icon-headphone">
              <i class="w-icon-headphone" />
            </span>
            <span v-else-if="contact.name === 'Address'" class="icon-box-icon icon-map-marker">
              <i class="w-icon-map-marker" />
            </span>
            <span v-else class="icon-box-icon icon-fax">
              <i class="w-icon-fax" />
            </span>
          </div>

          <div class="icon-box-content">
            <h4 class="icon-box-title">
              {{ contact.name }}
            </h4>
            <p>{{ contact.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End of Contact Information section -->
</template>

<style scoped lang="scss">
.mb-10 {
    margin-bottom: 5rem !important;
}
section {
    display: block;
}
.content-title-section .title {
    margin: 0 auto 0.7rem;
    font-size: 2.4rem;
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
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
}
p {
    font-size: 1.4rem;
    line-height: 1.86;
}
.contact-information-section {
    padding-bottom: 0.9rem;
}

.swiper-container {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
}
.swiper-wrapper {
    transform: translate3d(0px,0,0);
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
.text-center {
    text-align: center !important;
}
.swiper-slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    position: relative;
    transition-property: transform;
}
.contact-us .icon-box .icon-email {
    margin: 0.3rem 0 1.5rem;
}
.icon-box.text-center .icon-box-icon {
    margin-bottom: 1.6rem;
}
.icon-box-icon {
    display: inline-block;
    margin-bottom: 1.4rem;
}
.icon-box .icon-box-content {
    text-align: center;
}
.icon-box-content .icon-box-title {
    font-size: 1.8rem;
    line-height: 1.3;
    margin-bottom: 0.5rem;
    text-transform: none;
}
.icon-box .icon-box-title {
    letter-spacing: -0.025em;
}

.icon-box-primary .icon-box-icon i {
    color: #336699;
}

.icon-box-icon i {
    font-size: 5.2rem !important;
    font-weight: 400;
    line-height: 1;
}

.contact-us .icon-box-content p {
    font-size: 1.4rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.icon-box p {
    font-size: 1.3rem;
    word-break: break-word;
    margin: 0;
    line-height: 1.2;
    color: #666;
}
</style>
