<template>
  <div v-if="success" class="resultOk">
    <img src="/payment-success.png" alt="успешная оплата" id="imgOk">
    Оплата завершена. Номер счета: {{ invoiceNumber }}
  </div>
  <div v-else class="resultFailed">
    <img src="/payment-failure.jpg" alt="оплата не прошла" id="imgFailed">
    Не удалось произвести оплату счета: {{ invoiceNumber }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      campaignId: '',
      result: '',
      success: false,
      invoiceNumber: 'обновляется...',
      invoiceNum: null
    }
  },
  methods: {
    async processPayment() {
      let resultData = {
        campaign_id: this.campaignId,
        result: this.success,
      }
      try {
        await axios.post('http://127.0.0.1:8000/api/result/', resultData).then((response) => {
          if (response.status === 200) {
            this.invoiceNum = response.data.invoice_number
          }
        })
      } catch (e) {
        if (e.response.status === 400) {
          this.invoiceNum = 'обрабатывается...'
        } else {
          this.$router.replace('/error');
        }
      }
    }
  },
  watch: {
    invoiceNum(newVal, oldVal) {
      if (newVal !== null) {
        this.invoiceNumber = newVal;
      }
    }
  },
  created() {
    this.campaignId = this.$route.params.id;
    this.result = this.$route.params.result;
    this.success = this.result === 'success';
    this.processPayment();
  }
}
</script>

<style scoped>
.resultOk {
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
  color: darkslategrey;
}
.resultFailed {
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
  color: darkred;
}
#imgOk {
  width: 70px;
  margin-bottom: 10px;
}
#imgFailed {
  width: 100px;
}
</style>