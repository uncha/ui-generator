<<<<<<< HEAD

        <template>
          <b-form @submit.prevent="onSubmit">
            <b-form-group :label="'제목'" :label-cols="4">
                <b-form-input
                  type="text"
                  maxlength="50"
                  :placeholder="'제목을 입력해 주세요.'"
                  v-model="$v.form.ttl.$model"
                  :state="validateState('ttl')"
                />
                <b-form-invalid-feedback>
                  입력해주세요.
                </b-form-invalid-feedback>
        
          </b-form-group>
        <b-form-group :label="'시작일'" :label-cols="4">
        <b-form-datepicker v-model="schBeginDt"></b-form-datepicker>
      
          </b-form-group>
        <b-form-group :label="'종료일'" :label-cols="4">
        <b-form-datepicker v-model="schEndDt"></b-form-datepicker>
      
          </b-form-group>
        
            <button type="submit" class="btn btn-primary">전송</button>
          </b-form>
=======
<template>
  <div>
    <b-form @submit.prevent="onSubmit" v-if="form != ''">
      <b-form-group :label="item.label" :label-cols="baseForm.config.labelCols" v-for="(item,i) in baseForm.rows" :key="`row-${i}`">
        <template v-if="item.type == 'input'">
          <template v-if="item.requiredOptions">
            <b-form-input
              type="text"
              :maxlength="item.maxLength"
              :placeholder="item.placeholder"
              v-model="$v.form[item.key].$model"
              :state="validateState(item.key)"
            />
            <b-form-invalid-feedback>
              입력해주세요.
            </b-form-invalid-feedback>
          </template>
          <template v-else>
            <b-form-input
              type="text"
              :maxlength="item.maxLength"
              :placeholder="item.placeholder"
              v-model="$v.form[item.key].$model"
            />
          </template>
        </template>
        <template v-else-if="item.type == 'date'">
          <b-form-datepicker
            v-model="form[item.key]"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            locale="kr"
          ></b-form-datepicker>
>>>>>>> 86ba8af9ff6cf2b037774867ae0f39d5ce5a4326
        </template>
      </b-form-group>
      <button type="submit" class="btn btn-primary">전송</button>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, alphaNum } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations() {
    if(this.formValidations != '') {
      return {
        form: this.formValidations
      }
    }
  },
  props: {
    baseForm: {
      type:Object,
      required:true
    }
  },
  data () {
    return {
      form:'',
      formValidations:''
    }
  },
  created () {
    let form = {}
    let formValidations = {
    }

    _.forEach(this.baseForm.rows, (item, i) => {
      form[item.key] = eval(item.value)
      if(item.requiredOptions) {
        formValidations[item.key] = { required }
      }
    });

    this.formValidations = formValidations
    this.form = form
  },
  mounted () {

<<<<<<< HEAD
          export default {
	          mixins: [validationMixin],
            validations: {
          		form: {ttl:{required},schBeginDt:{required},schEndDt:{required},}
            },
            data () {
              return "\n        {\n          form: {\n      ttl:schBeginDt:moment().format('YYYY-MM-DD')schEndDt:moment().format('YYYY-MM-DD')\n          }\n        }\n      "
            },
            mounted () {
=======
  },
  methods: {
  	validateState (name) {
  		const { $dirty, $error } = this.$v.form[name]
  		return $dirty ? !$error : null
  	},
  	onSubmit () {
  		this.$v.form.$touch()
  		if (this.$v.form.$anyError) {
>>>>>>> 86ba8af9ff6cf2b037774867ae0f39d5ce5a4326

  		}
  	}
  }
}
</script>
