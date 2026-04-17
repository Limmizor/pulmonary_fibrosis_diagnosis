<template>
  <div>
    <h2>历史病例</h2>
    <el-table :data="historyList" style="width: 100%">
      <el-table-column prop="case_id" label="病例ID" />
      <el-table-column prop="patient_name" label="患者姓名" />
      <el-table-column prop="diagnosis_time" label="诊断时间" />
      <el-table-column prop="subtype" label="亚型" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button @click="viewDetail(row.case_id)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import client from '@/api/client'

const historyList = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const res = await client.get('/history')
    historyList.value = res
  } catch (error) {
    console.error(error)
  }
})

const viewDetail = (caseId: number) => {
  router.push({ name: 'diagnosis', query: { caseId } })
}
</script>