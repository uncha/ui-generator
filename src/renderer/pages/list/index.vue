<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group :label="'Base URL(Preview)'" :label-cols="2">
        <b-input v-model="form.previewBaseUrl" />
      </b-form-group>
      <b-form-group :label="'Base URL'" :label-cols="2">
        <b-input v-model="form.baseUrl" />
      </b-form-group>
      <b-form-group :label="'URL'" :label-cols="2">
        <b-input v-model="form.url" />
      </b-form-group>
      <b-form-group :label="'Config'" :label-cols="2">
        <v-jsoneditor v-model="form.config" :height="'200px'" :options="options" :plus="false" @error="onError" />
      </b-form-group>
      <b-form-group :label="'Fields'" :label-cols="2">
        <v-jsoneditor v-model="form.fields" :height="'400px'" :options="options" :plus="false" @error="onError" />
      </b-form-group>
      <b-form-group :label="'Search'" :label-cols="2">
        <v-jsoneditor v-model="form.search" :height="'400px'" :options="options" :plus="false" @error="onError" />
      </b-form-group>
      <b-form-group :label="'Directory Path'" :label-cols="2">
        <b-input v-model="form.directoryPath" />
      </b-form-group>
      <b-form-group :label="'File Name'" :label-cols="2">
        <b-input v-model="form.fileName" />
      </b-form-group>
      <div class="text-center">
        <button type="button" class="btn btn-info" @click="showPreview">Preview</button>
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </b-form>

    <b-modal ref="preview" hide-footer centered :title="'Preview'" :size="'lg'">
      <List :base-form="form" />
    </b-modal>
  </div>
</template>

<script>
import path from 'path'
import os from 'os'
import fs from 'fs'
import _ from 'lodash'
import List from '@/components/preview/list'

export default {
  components: {
    List
  },
  data () {
    return {
      form: {
        previewBaseUrl: 'http://175.123.253.240:8080/',
        baseUrl: '/',
        url: 'api/athlete/notice/list',
        directoryPath: '',
        fileName: 'list.vue',
        fields: [
          {
            key: 'no',
            label: 'NO',
            sortable: false
          }, {
            key: 'ttl',
            label: '글제목',
            sortable: true
          }, {
            key: 'rgstrId',
            label: '아이디',
            sortable: true
          }, {
            key: 'rgstrNm',
            label: '이름',
            sortable: true
          }
        ],
        search: [
          {
            key: 'schTxt',
            type: 'input',
            value: '',
            label: '검색',
            searchFields: {
              key: 'schFld',
              list: [
                {
                  key: 'whle',
                  label: '제목 + 내용'
                },
                {
                  key: 'ttl',
                  label: '제목'
                },
                {
                  key: 'cont',
                  label: '내용'
                }
              ]
            }
          }, {
            key: 'schBeginRegistDt',
            type: 'date',
            label: '시작일'
          }
        ],
        config: {
          totalSize: 'totalSize',
          number: 'number',
          list: 'list',
          labelCols: 4,
          params: {
            currentPage: 'pg',
            pageSize: 'pgSz'
          }
        }
      },
      options: {
        mode: 'code'
      },
      vueCode: ``,
      createType: ''
    }
  },
  mounted () {
    this.form.directoryPath = path.join(os.homedir(), 'Desktop')
  },
  methods: {
    showPreview () {
      this.createType = 'preview'
      this.createVueCode()
    },
    onSubmit () {
      this.createType = ''
      this.createVueCode()
    },
    onError (e) {
      console.log('E', e)
    },
    getTotal () {
      return `
            <p>
              전체 ({{ items.${this.form.config.totalSize} }})
            </p>
      `
    },
    getNumber () {
      return `
              <template v-slot:cell(no)="data">
                {{ items.${this.form.config.number} - data.index }}
              </template>
      `
    },
    getPagination () {
      return `
            <b-pagination
              v-model="params.${this.form.config.params.currentPage}"
              :total-rows="items.${this.form.config.totalSize}"
              :per-page="params.${this.form.config.params.pageSize}"
              align="center"
              @input="loadData"
            ></b-pagination>
      `
    },
    getSearchFieldsOptions (key, list) {
      let options = `<b-form-select v-model="params.${key}">`

      _.forEach(list, (item, i) => {
        options += `<b-form-select-option value="${item.key}">${item.label}</b-form-select-option>`
      })

      options += `</b-form-select>`

      return options
    },
    getSearchTypeInput (item) {
      let searchFields = ``

      if (item.searchFields && item.searchFields != '' && item.searchFields.list) {
        searchFields = `<template #prepend>
                    ${this.getSearchFieldsOptions(item.searchFields.key, item.searchFields.list)}
                  </template>`
      }

      return `
              <b-form-group :label="'${item.label}'" :label-cols="2">
                <b-input-group>
                  ${searchFields}
                  <b-form-input
                    v-model="params.${item.key}"
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
      `
    },
    getSearchTypeDate (item) {
      return `
              <b-form-group :label="'${item.label}'" :label-cols="2">
                <b-form-datepicker v-model="params.${item.key}" @input="loadData" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-form-datepicker>
              </b-form-group>
      `
    },
    getSearchFields () {
      let fields = ``

      _.forEach(this.form.search, (item, i) => {
        switch (item.type) {
        case 'input':
          fields += this.getSearchTypeInput(item)
          break
        case 'date':
          fields += this.getSearchTypeDate(item)
          break
        }
      })

      return fields
    },
    createVueCode () {
      console.log('THIS.FORM', this.form)

      const closeScript = '</' + 'script' + '>'

      const data = {
        fields: this.form.fields,
        items: {
          [`${this.form.config.list}`]: [],
          [`${this.form.config.totalSize}`]: 1,
          [`${this.form.config.number}`]: 1
        },
        params: {
          [`${this.form.config.params.pageSize}`]: 10,
          [`${this.form.config.params.currentPage}`]: 1
        }
      }

      _.forEach(this.form.search, (item, i) => {
        data.params[item.key] = ''

        if (item.searchFields && item.searchFields != '' && item.searchFields.list) {
          data.params[item.searchFields.key] = item.searchFields.list[0].key
        }
      })

      this.vueCode = `
        <template>
          <div>
            <div class="search-area">
              ${this.getSearchFields()}
            </div>
            <div class="row">
              <div class="col-6">
                ${this.form.config.totalSize != '' ? this.getTotal() : ''}
              </div>
              <div class="col-6 text-right">
                <b-form-select v-model="params.${this.form.config.params.pageSize}" style="width:70px" @change="loadData">
                  <b-form-select-option :value="10">10</b-form-select-option>
                  <b-form-select-option :value="20">20</b-form-select-option>
                  <b-form-select-option :value="50">50</b-form-select-option>
                  <b-form-select-option :value="100">100</b-form-select-option>
                  <b-form-select-option :value="200">200</b-form-select-option>
                </b-form-select>
              </div>
            </div>
            <b-table :items="items.${this.form.config.list}" :fields="fields">
              ${this.form.config.number != '' ? this.getNumber() : ''}
            </b-table>
            ${this.form.config.totalSize != '' ? this.getPagination() : ''}
          </div>
        </template>

        <script>
          export default {
            data () {
              return ${JSON.stringify(data)}
            },
            created () {
              if(this.$route.query) {
                this.params = this.$route.query
              }
            },
            mounted () {
              this.loadData();
            },
            methods: {
              loadData () {
                this.$axios.$get('${this.createType == 'preview' ? this.form.previewBaseUrl : this.form.baseUrl}${this.form.url}', {
                  params:this.params
                }).then(res=>{
                  this.items = res.data
                })
              },
            }
          }
        ${closeScript}

        <style></style>
      `

      // console.log('THIS.vueCode', this.vueCode)

      if (this.createType == 'preview') {
        // fs.writeFile('./src/renderer/components/preview/list.vue', this.vueCode, err => {
        //   console.log('ERR', err)
        // })

        this.$refs.preview.show()
      } else {
        fs.writeFile(`${this.form.directoryPath}/${this.form.fileName}`, this.vueCode, err => {
          console.log('ERR', err)
        })
      }
    }
  }
}
</script>

<style>

</style>
