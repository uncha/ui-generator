<template>
  <div>
    <div v-if="form != ''">
      <div class="search-area">
        <b-form-group :label="'검색'" :label-cols="2">
          <b-input-group>
            <template #prepend>
              <b-form-select v-model="params.schFld">
                <b-form-select-option value="whle">제목 + 내용</b-form-select-option>
              </b-form-select>
            </template>
            <b-form-input
              v-model="params.schTxt"
              type="text"
              maxlength="20"
              placeholder="검색어를 입력해 주세요."
              autocomplete="off"
            />
            <template #append>
              <b-button variant="primary" @click="loadData"><b-icon icon="search" /></b-button>
            </template>
          </b-input-group>
        </b-form-group>
        <b-form-group :label="'시작일'" :label-cols="2">
          <b-form-datepicker v-model="params.schBeginRegistDt" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" @input="loadData" />
        </b-form-group>
        <!-- <b-form-group v-for="searchGroup in baseForm.search" :label="searchGroup.label" :label-cols="baseForm.config.labelCols">
          <template v-if="searchGroup.type=='input'">
            <b-input-group>

              <b-form-input
                v-model="searchGroup.schTxt"
                type="text"
                maxlength="20"
                placeholder="검색어를 입력해 주세요."
                autocomplete="off"
              />
              <template #append>
                <b-button variant="primary" @click="loadData"><b-icon icon="search" /></b-button>
              </template>
            </b-input-group>
          </template>
          <template v-else-if="searchGroup.type=='date'" />
        </b-form-group> -->
      </div>
      <div class="row">
        <div class="col-6">
          <p>
            전체 ({{ items[baseForm.config.totalSize] }})
          </p>
        </div>
        <div class="col-6 text-right">
          {{ items.params }}
          <b-form-select v-model="items[baseForm.config.params.pageSize]" style="width:70px" @change="loadData">
            <b-form-select-option :value="10">10</b-form-select-option>
            <b-form-select-option :value="20">20</b-form-select-option>
            <b-form-select-option :value="50">50</b-form-select-option>
            <b-form-select-option :value="100">100</b-form-select-option>
            <b-form-select-option :value="200">200</b-form-select-option>
          </b-form-select>
        </div>
      </div>
      <b-table :items="items[baseForm.config.list]" :fields="fields">
        <template v-slot:cell(no)="data">
          {{ items[baseForm.config.number] - data.index }}
        </template>
      </b-table>
      <b-pagination
        v-model="items[baseForm.config.params.currentPage]"
        :total-rows="items[baseForm.config.totalSize]"
        :per-page="items[baseForm.config.params.pageSize]"
        align="center"
        @input="loadData"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    baseForm: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      items: {},
      params: {},
      fields: [],
      form: {}
    }
  },
  created () {
    if (this.$route.query) {
      this.params = this.$route.query
    }

    // _.forEach(this.baseForm.search, searchGroup => {
    //   switch (searchGroup.type) {
    //     case 'input':
    //       this.form[searchGroup.key]
    //       break
    //     case 'date':
    //
    //       break
    // })

    // this.form

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
    this.loadData()
  },
  methods: {
    loadData () {
      this.$axios.$get(`${this.baseForm.previewBaseUrl}${this.baseForm.url}`, {
        params: this.params
      }).then(res => {
        this.items = res.data
      })
    }
  }
}
</script>

<style></style>
