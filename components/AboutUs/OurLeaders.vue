<template>
  <section class="member-section mt-10 pt-9 mb-10 pb-4">
    <div class="container">
      <h4 class="title title-center mb-3">
        Meet Our Leaders
      </h4>
      <p class="text-center mb-8">
        Nunc id cursus metus aliquam. Libero id faucibus nisl tincidunt eget. Aliquam<br>
        maecenas ultricies mi eget mauris. Volutpat ac
      </p>
      <div class="swiper-container swiper-theme">
        <div class="swiper-wrapper row cols-xl-4 cols-lg-3 cols-sm-2 cols-1">
          <div class="swiper-slide member-wrap">
            <figure class="br-lg">
              <NuxtImg src="products/6.webp" alt="Member" width="295" height="332" class="rounded-2xl mb-4" />
              <div class="figure-icon">
                <div class="social-icons">
                  <Icon name="bxl:facebook" class="icon-facebook" />
                  <Icon name="ant-design:twitter-outlined" class="icon-twiter mx-4" />
                  <Icon name="circum:instagram" class="icon-instagram" />
                </div>
              </div>
            </figure>
            <div class="member-info text-center ">
              <h4 class="member-name">
                John Doe
              </h4>
              <p class="text-uppercase">
                Founder & CEO
              </p>
            </div>
          </div>
          <div class="swiper-slide member-wrap">
            <figure class="br-lg">
              <NuxtImg src="products/8.webp" alt="Member" width="295" height="332" class="rounded-2xl mb-4" />
              <div class="figure-icon">
                <div class="social-icons">
                  <Icon name="bxl:facebook" class="icon-facebook" />
                  <Icon name="ant-design:twitter-outlined" class="icon-twiter mx-4" />
                  <Icon name="circum:instagram" class="icon-instagram" />
                </div>
              </div>
            </figure>
            <div class="member-info text-center ">
              <h4 class="member-name">
                Jessica Doe
              </h4>
              <p class="text-uppercase">
                Marketing
              </p>
            </div>
          </div>
          <div class="swiper-slide member-wrap">
            <div class="br-lg">
              <NuxtImg src="products/9.webp" alt="Member" width="295" height="332" class="rounded-2xl mb-4" />
              <div class="figure-icon">
                <div class="social-icons">
                  <Icon name="bxl:facebook" class="icon-facebook" />
                  <Icon name="ant-design:twitter-outlined" class="icon-twiter mx-4" />
                  <Icon name="circum:instagram" class="icon-instagram" />
                </div>
              </div>
            </div>
            <div class="member-info text-center ">
              <h4 class="member-name">
                Rick Edward Doe
              </h4>
              <p class="text-uppercase">
                Developer
              </p>
            </div>
          </div>
          <div class="swiper-slide member-wrap">
            <figure class="br-lg ">
              <NuxtImg src="products/10.webp" alt="Member" width="295" height="332" class="rounded-2xl mb-4" />
              <div class="figure-icon">
                <div class="social-icons p-2">
                  <Icon name="bxl:facebook" class="icon-facebook" />
                  <Icon name="ant-design:twitter-outlined" class="icon-twiter mx-4" />
                  <Icon name="circum:instagram" class="icon-instagram" />
                </div>
              </div>
            </figure>
            <div class="member-info text-center ">
              <h4 class="member-name">
                Melinda Wolosky
              </h4>
              <p class="text-uppercase">
                Design
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.br-lg {
  position: relative;

  & .figure-icon {
    display: block;
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.4s;
    padding: 1rem;
    width: 100%;
    z-index: 1;

    & .social-icons {
      display: flex;
      justify-content: center;
      font-size: 5rem;
      color: #ffffff;

      & svg {
        border: 2px solid #fff;
        border-radius: 50%;
        padding: 0.5rem;
      }

      & :hover {
        border: none;
        cursor: pointer;
        &.icon-instagram {
          background-color: #cc0001;
          transition: all 0.6s;

        }
        &.icon-twiter {
          background-color: #00ADEF;
          transition: all 0.6s;
          cursor: pointer;
        }
        &.icon-facebook {
          background-color: #1b4f9b;
          transition: all 0.6s;
          cursor: pointer;
        }

      }
    }
  }

  &:hover {
    & img {
      opacity: 0.8;
    }
    & .figure-icon {
      top: 50%;
      opacity: 1;
    }
  }
}

.member-section .title {
  font-size: 3.4rem;
}

h4 {
  font-size: 1.8rem;
}

.text-uppercase {
  text-transform: uppercase !important;
}

p {
  font-size: 1.4rem;
  line-height: 1.86;
  font-weight: 400;
}

.member-name {
  margin: 0;
}
.swiper-slide {
  padding: 0 10px;
}
</style>
