<template>
  <div>
    <div v-if="form != ''">
      <div class="search-area">
        <b-form-group :label="'검색'" :label-cols="2">
          <b-input-group>
            <template #prepend>
              <b-form-select v-model="params.schFld"><b-form-select-option value="whle">제목 + 내용</b-form-select-option><b-form-select-option value="ttl">제목</b-form-select-option><b-form-select-option value="cont">내용</b-form-select-option></b-form-select>
            </template>
            <b-form-input
              v-model="params.schTxt"
              type="text"
              maxlength="20"
              placeholder="검색어를 입력해 주세요."
              autocomplete="off"
            ></b-form-input>
            <template #append>
              <b-button variant="primary" @click="loadData"><b-icon icon="search"></b-icon></b-button>
            </template>
          </b-input-group>
        </b-form-group>
        <b-form-group :label="'시작일'" :label-cols="2">
          <b-form-datepicker v-model="params.schBeginRegistDt" @input="loadData" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-form-datepicker>
        </b-form-group>
      </div>
      <div class="row">
        <div class="col-6">
          <p>
            전체 ({{ items.totalSize }})
          </p>
        </div>
        <div class="col-6 text-right">
          <b-form-select v-model="params.pgSz" style="width:70px" @change="loadData">
            <b-form-select-option :value="10">10</b-form-select-option>
            <b-form-select-option :value="20">20</b-form-select-option>
            <b-form-select-option :value="50">50</b-form-select-option>
            <b-form-select-option :value="100">100</b-form-select-option>
            <b-form-select-option :value="200">200</b-form-select-option>
          </b-form-select>
        </div>
      </div>
      <b-table :items="items.list" :fields="fields">
        <template v-slot:cell(no)="data">
          {{ items.number - data.index }}
        </template>
      </b-table>
      <b-pagination
        v-model="params.pg"
        :total-rows="items.totalSize"
        :per-page="params.pgSz"
        align="center"
        @input="loadData"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items:{},
        params:{},
        fields:[],
      }
    },
    props: {
      baseForm: {
        type:Object,
        required:true
      }
    },
    created () {
      if(this.$route.query) {
        this.params = this.$route.query
      }

      this.fields = this.baseForm.fields
      this.items = {
        [`${this.baseForm.config.list}`]: [],
        [`${this.baseForm.config.totalSize}`]: 1,
        [`${this.baseForm.config.number}`]: 1
      }
      this.params = {
        [`${this.baseForm.config.params.pageSize}`]: 10,
        [`${this.baseForm.config.params.currentPage}`]: 1
      }
    },
    mounted () {
      this.loadData();
    },
    methods: {
      loadData () {
        this.$axios.$get(`${this.baseForm.previewBaseUrl}${this.baseForm.url}`, {
          params:this.params
        }).then(res=>{
          this.items = res.data
        })
      },
    }
  }
</script>

<style></style>
