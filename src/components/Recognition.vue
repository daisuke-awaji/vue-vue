<template>
  <div class="recognition">
    <div v-if="!viewImage">
      <h2>Select an image.</h2>
      <input @change="selectedImage" type="file" name="file">
    </div>
    <div v-else>
      <img v-show="viewImage" :src="viewImage"/>
      <br />
      <button @click="removeImage">Remove image</button>
    </div>
    <br />
    <button @click="upload" type="submit">Upload Photo</button>
    <br />
    <br />
    {{ rekognitionDetectLabels }}
    <ul>
      <li v-for="(label, key, index) in rekognitionDetectLabels" :key="index">
        Name: {{ label.Name }}, Confidence: {{ label.Confidence }}
      </li>
    </ul>
    <button @click="detectLabels" type="submit">detectLabels</button>
  </div>
</template>

<script>
// import axios from 'axios'
import AWS from 'aws-sdk'

const BUCKET_NAME = 'vue-sample-apps-upload-photos'

AWS.config.region = 'us-east-1'
AWS.config.apiVersions = {rekognition: '2016-06-27'}
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:b272eb75-97a4-4f3d-8046-5d49d00ffbbe'
})
AWS.config.credentials.get(function (err) {
  if (!err) {
    console.log('Cognito Identity ID: ' + AWS.config.credentials.identityId)
  }
})

export default {
  name: 'recognition',
  props: {
  },
  data () {
    return {
      viewImage: null,
      uploadImage: null,
      rekognitionDetectLabels: []
    }
  },
  created: function () {
    this.rekognitionDetectLabels = [
      { Name: 'a', Confidence: '10' }
    ]
  },
  methods: {
    selectedImage: function (e) {
      // 選択された File の情報を保存しておく
      e.preventDefault()
      let files = e.target.files
      let reader = new FileReader()
      reader.onload = (e) => {
        this.viewImage = e.target.result
      }
      reader.readAsDataURL(files[0])
      this.uploadImage = files[0]
    },
    removeImage: function (e) {
      this.viewImage = ''
    },
    upload: function () {
      var s3 = function () {
        return new AWS.S3({params: {Bucket: BUCKET_NAME}})
      }
      let file = this.uploadImage
      let timestamp = new Date().getTime()
      let filename = timestamp + '.png'
      var params = {
        Key: filename,
        Body: file,
        ACL: 'public-read'
      }
      s3().putObject(params, function (err, data) {
        if (err) {
          console.log(err, err.stack) // an error occurred
        } else {
          console.log(data) // successful response
        }
      })
    },
    detectLabels: function () {
      // rekognition
      var rekognition = function () {
        return new AWS.Rekognition()
      }
      var params = {
        Image: {
          Bytes: this.uploadImage,
          S3Object: {
            Bucket: BUCKET_NAME,
            Name: '1534577324638.png' //filename
          }
        }
      }
      rekognition().detectLabels(params, function (err, data) {
        if (err) {
          console.log(err, err.stack) // an error occurred
        } else {
          console.log(data) // successful response
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
