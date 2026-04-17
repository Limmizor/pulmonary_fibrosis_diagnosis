<template>
  <div class="home">
    <el-container>
      <el-header>
        <h1>肺影智诊——肺纤维化CT影像辅助诊断系统</h1>
      </el-header>
      <el-main>
        <el-card class="upload-card">
          <template #header>
            <span>上传CT影像</span>
          </template>
          <el-upload
            class="upload-demo"
            drag
            :auto-upload="false"
            :on-change="handleFileChange"
            :limit="1"
            action="#"
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              将DICOM文件拖到此处，或<em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                支持.dcm文件或.zip压缩包（包含DICOM序列）
              </div>
            </template>
          </el-upload>
          <el-button
            type="primary"
            :loading="uploading"
            :disabled="!selectedFile"
            @click="uploadFile"
            style="margin-top: 20px"
          >
            {{ uploading ? '上传中...' : '开始诊断' }}
          </el-button>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { uploadDICOM } from '@/api/upload'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedFile = ref<File | null>(null)
const uploading = ref(false)

const handleFileChange = (file: any) => {
  selectedFile.value = file.raw
}

const uploadFile = async () => {
  if (!selectedFile.value) return
  uploading.value = true
  try {
    const res = await uploadDICOM(selectedFile.value)
    ElMessage.success('上传成功，正在跳转诊断页面...')
    // 跳转到诊断页面，携带case_id
    router.push({ name: 'diagnosis', query: { caseId: res.case_id } })
  } catch (error) {
    ElMessage.error('上传失败，请重试')
    console.error(error)
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
}
.el-header {
  background-color: #409EFF;
  color: white;
  text-align: center;
  line-height: 60px;
}
.upload-card {
  max-width: 600px;
  margin: 50px auto;
}
</style>