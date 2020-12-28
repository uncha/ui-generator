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
      <b-form-group :label="'Rows'" :label-cols="2">
        <v-jsoneditor v-model="form.rows" :height="'600px'" :options="options" :plus="false" @error="onError" />
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
      <Form />
    </b-modal>
  </div>
</template>

<script>
import Form from '@/components/preview/form.vue'
import _ from 'lodash'
import path from 'path'
import os from 'os'
import fs from 'fs'

export default {
  components: {
    'Form': Form
  },
  data () {
    return {
      form: {
        previewBaseUrl: 'http://175.123.253.240:8080/',
        baseUrl: '/',
        url: 'api/athlete/custom_gallery/regist',
        directoryPath: '',
        fileName: 'form.vue',
        rows: [
          {
            key: 'ttl',
            label: '제목',
            type: 'input',
            required: true,
            requiredOptions: {
              minLength:30
            },
            placeholder: '제목을 입력해 주세요.'
          }
        ],
        config: {
          labelCols:4,
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
    getFormGroups () {
      return `
        <b-form-group :label="'Base URL(Preview)'" :label-cols="2">
          <b-input></b-input>
        </b-form-group>
      `
    },
    createVueCode () {
      const closeScript = '</' + 'script' + '>'

      let data = {

      }

      this.vueCode = `
        <template>
          <b-form @submit.prevent="onSubmit">
            ${this.getFormGroups()}
          </b-form>
        </template>

        <script>
          export default {
            data () {
              return ${data}
            },
            mounted () {

            },
            methods: {

            }
          }
        ${closeScript}
      `

      if(this.createType == 'preview') {
        fs.writeFile('./src/renderer/components/preview/form.vue', this.vueCode, (err) => {
          console.log('ERR', err)
        })

        this.$refs['preview'].show()
      } else {
        fs.writeFile(`${this.form.directoryPath}/${this.form.fileName}`, this.vueCode, (err) => {
          console.log('ERR', err)
        })
      }
    }
  }
}
</script>

<style>

</style>
