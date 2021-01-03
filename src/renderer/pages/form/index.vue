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
      <Form :baseForm="form"></Form>
    </b-modal>
  </div>
</template>

<script>
import path from 'path'
import os from 'os'
import fs from 'fs'
import Form from '@/components/preview/form.vue'

export default {
  components: {
    Form,
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
            requiredOptions: {
              required: {
                message: '제목을 입력해 주세요.'
              },
              minLength: {
                value: 3,
                message: '제목은 3글자 이상 입력하셔야 합니다.'
              }
            },
            maxLength: 50,
            placeholder: '제목을 입력해 주세요.',
            value: "''"
          },
          {
            key: 'beginDt',
            label: '시작일',
            type: 'date',
            value: "moment().format('YYYY-MM-DD')"
          },
          {
            key: 'select',
            label: '선택메뉴',
            type: 'async-select',
            apiUrl: '',
            params: {},
            selectAll: true
          }
        ],
        config: {
          labelCols: 4
        }
      },
      options: {
        mode: 'code'
      },
      vueCode: ``,
      createType: ''
    }
  },
  computed: {
    html () {
      return `
      <b-form>
      <b-form-group :label="'File Name'" :label-cols="2">
        test
      </b-form-group>
      <button type="button" class="btn btn-primary">{{options.mode}}</button>
      </b-form>
      `
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
    getInput (item) {
      let value = ''

      if (item.requiredOptions) {
        value += `
                <b-form-input
                  type="text"
                  maxlength="${item.maxLength}"
                  :placeholder="'${item.placeholder}'"
                  v-model="$v.form.${item.key}.$model"
                  :state="validateState('${item.key}')"
                />
                <b-form-invalid-feedback>
                  입력해주세요.
                </b-form-invalid-feedback>
        `
      } else {
        value = `
              <b-form-input
                type="text"
                maxlength="${item.maxLength}"
                :placeholder="'${item.placeholder}'"
                v-model="$v.form.${item.key}.$model"
              />
            `
      }

      return value
    },
    getDate (item) {
      const value = `
            <b-form-datepicker
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            locale="kr"
            ></b-form-datepicker>
      `

      return value
    },
    getFormGroups () {
      let formGroups = ``

      _.forEach(this.form.rows, (item, i) => {
        formGroups += `<b-form-group :label="'${item.label}'" :label-cols="${this.form.config.labelCols}">`

        switch (item.type) {
        case 'input':
          formGroups += this.getInput(item)
          break
        case 'date':
          formGroups += this.getDate(item)
          break
        }

        formGroups += `
          </b-form-group>
        `
      })

      return formGroups
    },
    createVueCode () {
      const closeScript = '</' + 'script' + '>'

      let data = `{form: {`

      _.forEach(this.form.rows, (item, i) => {
        switch (item.type) {
        case 'input':
          data += `${item.key}:${item.value},`
          break
        case 'date':
          data += `${item.key}:${item.value},`
          break
        }
      })

      data += `}}`

      let validationsForm = `{`
      _.forEach(this.form.rows, (item, i) => {
        validationsForm += `${item.key}:{required},`
      })
      validationsForm += `}`

      this.vueCode = `
        <template>
          <b-form @submit.prevent="onSubmit">
            ${this.getFormGroups()}
            <button type="submit" class="btn btn-primary">전송</button>
          </b-form>
        </template>

        <script>
          import { validationMixin } from 'vuelidate';
          import { required, minLength, alphaNum } from 'vuelidate/lib/validators';

          export default {
	          mixins: [validationMixin],
            validations: {
          		form: ${validationsForm}
            },
            data () {
              return ${data}
            },
            mounted () {

            },
            methods: {
          		validateState(name) {
          			const { $dirty, $error } = this.$v.form[name];
          			return $dirty ? !$error : null;
          		},
          		onSubmit() {
          			this.$v.form.$touch();
          			if (this.$v.form.$anyError) {
          				return;
          			}
          		},
            }
          }
        ${closeScript}
      `

      if (this.createType == 'preview') {
        // fs.writeFile('./src/renderer/components/preview/form.vue', this.vueCode, err => {
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
