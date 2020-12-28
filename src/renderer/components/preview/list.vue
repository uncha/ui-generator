
        <template>
          <div>
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
        </template>

        <script>
          export default {
            data () {
              return {"fields":[{"key":"no","label":"NO","sortable":false},{"key":"ttl","label":"글제목","sortable":true},{"key":"rgstrId","label":"아이디","sortable":true},{"key":"rgstrNm","label":"이름","sortable":true}],"items":{"list":[],"totalSize":1,"number":1},"params":{"pgSz":10,"pg":1,"schTxt":"","schFld":"whle","schBeginRegistDt":""}}
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
                this.$axios.$get('http://175.123.253.240:8080/api/athlete/notice/list', {
                  params:this.params
                }).then(res=>{
                  this.items = res.data
                })
              },
            }
          }
        </script>

        <style></style>
      