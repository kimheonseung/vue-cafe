<template>
  <div class="div-menu">
    <b-container class="container-menu">
      <b-row>
        <template v-for="(m, i) in menu" :key="i">
          <b-col @click="addToCart(m)" class="col-menu">
            <div class="div-menu-image">
              <img class="img-menu" :src="require('./assets/menu/'+(m.ice ? 'ice_' : 'hot_')+(m.name.toLowerCase())+'.jpg')" />
            </div>
            <div class="div-menu-name">
              [{{m.ice ? 'ICED ' : 'HOT '}}]{{m.name}}
            </div>
            <div class="div-menu-price">
              {{m.price}} 원
            </div>
          </b-col>
          <div v-if="i % 2 == 1" class="w-100"></div>
        </template>
      </b-row>
    </b-container>

    <!-- <template v-for="(p, i) in paging.pageList" :key="i">
      <a>{{p}}</a>
    </template> -->
  </div>
  <div class="div-cart">
    <b-container class="container-cart">
      <template v-for="(c, i) in cart" :key="i">
        <b-row v-if="i != 'totalPrice'">
          <b-col class="col-cart">
            <div class="div-cart-item">
              <div class="div-cart-item-name">
                {{c.name}}
              </div>
              <div class="div-cart-item-count">
                <input @change="modifyChart($event, c.id)" style="width: 100%" type="number" :value="c.count">
              </div>
              <div class="div-cart-item-button">
                <b-button @click="removeCart(c.id)" variant="danger">삭제</b-button>
              </div>
            </div>
            <div class="w-100"></div>
          </b-col>
        </b-row>
      </template>
      <b-row>
        
      </b-row>
    </b-container>
    <div class="div-total-price">
      총 금액 {{cart.totalPrice}} 원
    </div>
    <div class="div-order">
      <b-button class="btn-order" variant="success">주문하기</b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      menu: [],
      paging: {},
      cart: {
        totalPrice: 0
      },
    }
  },
  mounted() {
    this.$getMenu(1, 6)
      .then(rs => {
        if(rs.result) {
          this.menu = [];
          this.paging = rs.paging;
          rs.menu.forEach(m => {
            this.menu.push(m);
          })
        }
      })
  },
  methods: {
    addToCart(m) {
      let cartMenu = this.cart[m.id];
      if(cartMenu) {
        cartMenu.count += 1;
      } else {
        this.cart[m.id] = {
          id: m.id,
          name: (m.ice ? '[ICED] ' : '[HOT] ')+m.name,
          price: m.price,
          count: 1
        }
      }

      this.cart.totalPrice += m.price;
    },
    modifyChart(e, id) {
      let count = e.target.value;
      if(count <= 0) {
        alert('수량은 최소 1개 이상이어야 합니다.');
        e.target.value = 1;
        count = 1;
      }
      this.cart[id].count = count;
      this.calculateTotalPrice();
    },
    removeCart(id) {
      const count = this.cart[id].count;
      const price = this.cart[id].price;
      this.cart.totalPrice -= (price * count);
      delete this.cart[id];
    },
    calculateTotalPrice() {
      let totalPrice = 0;
      Object.keys(this.cart).forEach(key => {
        if(key != 'totalPrice') {
          totalPrice += (this.cart[key].price * this.cart[key].count);
        }
      });
      this.cart.totalPrice = totalPrice;
    }
  },
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.width-100 {
  width: 100vw;
}
.div-menu {
  height: 100vh;
  width: 80vw;
  max-width: 650px;
  min-width: 630px;
  color: darkgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.div-cart {
  height: 75vh;
  width: 20vw;
  max-width: 350px;
  min-width: 330px;
  color: darkgrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 10px;
}

.container-menu {
  max-width: 600px !important;
}

.container-cart {
  height: 80%;
}

.col-menu {
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 10px;
}

.col-cart {
  height: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 10px;
}

.div-menu-image {
  height: 70%;
  display: flex;
  align-items: center;
}

.img-menu {
  width: auto;
  height: 100%;
}

.div-menu-name {
  height: 15%;
  display: flex;
  align-items: flex-end;
}

.div-menu-price {
  height: 15%;
}

.div-cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.div-cart-item-name {
  width: 45%
}
.div-cart-item-count {
  width: 15%
}
.div-cart-item-button {
  width: 40%
}

.div-total-price {
  height: 10%;
}
.div-order {
  width: 100%;
  height: 10%;
}
.btn-order {
  width: 80%;
}
</style>