<template>
  <main>
    <div class="container">
      <div class="mb-3">
        <b-input-group id="search-group" label-for="search-input">
          <b-form-input
            id="search-input"
            v-model="word"
            required
            ref="word"
            placeholder="Aramak istediğiniz kelimeyi girin."
            v-on:keyup.enter="search()"
            class="text-center"
          ></b-form-input>
          <b-button type="submit" variant="primary" @click="search()" id="search-btn">Ara</b-button>
        </b-input-group>
      </div>
      <b-tabs content-class="mt-3 mb-3" v-if="isResultFound">
        <b-tab title="Anlamlar">
          <b-list-group>
            <b-list-group-item v-for="(result, index) in results.anlamlarListe" :key="index">
                  <span>{{ index+1 }}- </span><strong class="text-success">{{ result.anlam }}</strong>:
                    <p v-for="(example, i) in result.orneklerListe" :key="i">
                      {{ example.ornek }}
                    </p>
                    <strong>
                      <b-badge v-for="(property, i) in result.ozelliklerListe" :key="i" pill variant="warning">{{ property.tam_adi }}</b-badge>
                    </strong>
                  </b-list-group-item>
                </b-list-group>
            </b-list-group-item>
          </b-list-group>
        </b-tab>
        
        <b-tab title="Birleşikler">
          <strong>Birleşikler:</strong>
          <b-list-group>
            <b-list-group-item v-for="(birlesik, index) in parseBirlesikler(results.birlesikler)" :key="index" >
              {{ birlesik }}
            </b-list-group-item>
          </b-list-group>
        </b-tab>

        <b-tab title="Lisan">
          <p>Lisan: <strong>{{ results.lisan }}</strong></p>
        </b-tab>

        <b-tab title="Atasözleri">
          <strong> Atasözleri: </strong>
          <b-list-group>
            <b-list-group-item v-for="(atasozu, index) in results.atasozu" :key="index" >
              {{ atasozu.madde }}
            </b-list-group-item>
          </b-list-group>
        </b-tab>
        
      </b-tabs>
      <div class="alert alert-warning text-center" v-if="isResultNotFound">
        Aradığınız kelimeye ilişkin sonuç bulunamadı
      </div>
    </div>
    <div class="footer">
      <ul>
        <li>
          <span class="font-10">
            TDK Türkçe Sözlük Tarayıcı Eklentisi &bull;
           geliştirici web sitesi: <a class="font-10" target="_blank" href="https://oguzcandemircan.com">oguzcandemircan.com</a>
          </span>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      word: "",
      results: {
        lisan: "",
        atasozu: {},
        birlesikler: {},
        anlamlarListe: {},
      },
      isResultFound: "",
      isResultNotFound: "",
    };
  },
  methods: {
    search() {
      axios.get(`http://sozluk.gov.tr/gts?ara=${this.word}`).then((res) => {
        if (res.data.error) {
          this.isResultNotFound = true;
          this.isResultFound = false;
          return false;
        }
        this.results = res.data[0];
        this.isResultFound = true;
        this.isResultNotFound = false;
      });
    },
    parseBirlesikler(data) {
      return this.isEmpty(data) ? {} : data.split(",");
    },
    isEmpty(obj) {
      obj = obj == null ? {} : obj;
      return Object.keys(obj).length === 0;
    },
  },
  mounted() {
    this.$refs.word.focus();
  },
};
</script>

<style>
.container {
  padding: 15px 25px !important;
  padding-bottom: 0px !important;
  min-width: 500px;
}
* {
  border-radius: 0px !important;
  font-size: 14px;
}
#search-input {
  width: 74% !important;
  display: unset !important;
}
#search-btn {
  width: 25% !important;
}
.footer {
  background-color: #f5f4f4;
  padding: 10px 0px;
}
.footer ul {
  margin: 0px !important;
  list-style: none;
}
.font-10 {
  font-size: 10px !important;
}
</style>