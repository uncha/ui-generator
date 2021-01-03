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

  },
  methods: {
  	validateState (name) {
  		const { $dirty, $error } = this.$v.form[name]
  		return $dirty ? !$error : null
  	},
  	onSubmit () {
  		this.$v.form.$touch()
  		if (this.$v.form.$anyError) {

  		}
  	}
  }
}
</script>
