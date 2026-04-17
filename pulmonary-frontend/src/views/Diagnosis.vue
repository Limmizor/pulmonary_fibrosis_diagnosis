<template>
  <div class="diagnosis">
    <el-container>
      <el-header>
        <h2>诊断结果</h2>
        <el-button @click="goHome" type="text">返回首页</el-button>
      </el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card>
              <template #header>CT切片预览</template>
              <div class="slice-container">
                <!-- 这里后期可集成Cornerstone或简单img -->
                <img :src="currentSliceUrl" alt="CT切片" v-if="currentSliceUrl" />
                <el-skeleton v-else :rows="10" animated />
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
              <template #header>诊断报告</template>
              <div v-if="diagnosisResult" class="report">
                <p><strong>疑似亚型：</strong>{{ diagnosisResult.subtype }}</p>
                <p><strong>置信度：</strong>{{ (diagnosisResult.confidence * 100).toFixed(2) }}%</p>
                <p><strong>病灶面积占比：</strong>{{ diagnosisResult.lesion_area_ratio }}%</p>
                <p><strong>分布范围：</strong>{{ diagnosisResult.distribution_range }}</p>
                <p><strong>影像所见：</strong>{{ diagnosisResult.report_text }}</p>
                <el-image :src="diagnosisResult.heatmap_url" style="width: 100%; margin-top: 10px" />
                <el-button @click="exportPDF" type="primary" style="margin-top: 20px">导出PDF报告</el-button>
              </div>
              <div v-else>
                <el-skeleton :rows="8" animated />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDiagnosis, triggerDiagnosis, type DiagnosisResult } from '@/api/diagnosis'
import { ElMessage } from 'element-plus'
import { exportToPDF } from '@/utils/pdfExport'

const route = useRoute()
const router = useRouter()
const caseId = ref<number>(parseInt(route.query.caseId as string))
const diagnosisResult = ref<DiagnosisResult | null>(null)
const currentSliceUrl = ref('')

onMounted(async () => {
  if (isNaN(caseId.value)) {
    ElMessage.error('无效的病例ID')
    router.push('/')
    return
  }
  // 先尝试获取已有诊断结果
  try {
    const res = await getDiagnosis(caseId.value)
    diagnosisResult.value = res
    // 假设后端返回切片预览URL
    currentSliceUrl.value = `/api/slice/${caseId.value}/representative`
  } catch (error) {
    // 如果没有诊断结果，则触发诊断
    try {
      ElMessage.info('正在分析影像，请稍候...')
      const res = await triggerDiagnosis(caseId.value)
      diagnosisResult.value = res
      currentSliceUrl.value = `/api/slice/${caseId.value}/representative`
      ElMessage.success('诊断完成')
    } catch (err) {
      ElMessage.error('诊断失败，请重试')
      console.error(err)
    }
  }
})

const goHome = () => {
  router.push('/')
}

const exportPDF = () => {
  if (diagnosisResult.value) {
    exportToPDF('诊断报告', diagnosisResult.value)
  }
}
</script>

<style scoped>
.diagnosis {
  padding: 20px;
}
.slice-container img {
  max-width: 100%;
}
.report {
  text-align: left;
}
</style>