
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
        </template>

        <script>
          import { validationMixin } from 'vuelidate';
          import { required, minLength, alphaNum } from 'vuelidate/lib/validators';

          export default {
	          mixins: [validationMixin],
            validations: {
          		form: {ttl:{required},schBeginDt:{required},schEndDt:{required},}
            },
            data () {
              return "\n        {\n          form: {\n      ttl:schBeginDt:moment().format('YYYY-MM-DD')schEndDt:moment().format('YYYY-MM-DD')\n          }\n        }\n      "
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
        </script>
      