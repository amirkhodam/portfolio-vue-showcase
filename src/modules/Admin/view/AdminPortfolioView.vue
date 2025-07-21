<template>
  <div class="mx-auto max-w-4xl py-8">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-bold">{{ $t('admin.manage_portfolios') }}</h2>
      <Button
        @click="openAdd"
        class="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded px-4 py-2 text-white shadow transition"
      >
        <i class="pi pi-plus"></i>
        {{ $t('admin.add_portfolio') }}
      </Button>
    </div>
    <DataTable
      :value="portfolios"
      class="p-datatable-sm rounded-lg shadow"
      responsiveLayout="scroll"
    >
      <Column field="title.en" :header="$t('admin.title_en')">
        <template #body="{ data }">
          <span class="font-medium">{{ data.title.en }}</span>
        </template>
      </Column>
      <Column :header="$t('admin.actions')" style="width: 180px">
        <template #body="{ data }">
          <Button
            @click="openEdit(data)"
            class="mr-2 inline-flex items-center gap-1 text-blue-600 hover:underline"
          >
            <i class="pi pi-pencil"></i>
            {{ $t('admin.edit_portfolio') }}
          </Button>
          <Button
            @click="deletePortfolio(data.id)"
            class="inline-flex items-center gap-1 text-red-600 hover:underline"
          >
            <i class="pi pi-trash"></i>
            {{ $t('admin.delete') }}
          </Button>
        </template>
      </Column>
    </DataTable>
    <DialogCenter v-model:visible="showModal">
      <PortfolioForm :portfolio="selectedPortfolio" @save="savePortfolio" @close="closeModal" />
    </DialogCenter>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePortfolioStore } from '@/modules/Portfolio/store/portfolio.store'
import PortfolioForm from '@/modules/Admin/components/PortfolioForm.vue'
import DialogCenter from '@/components/dialog/DialogCenter.vue'
import type { IPortfolio } from '@/modules/api'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from '@/components/button/Button.vue'

const store = usePortfolioStore()
const portfolios = computed(() => store.portfolios)

const showModal = ref<boolean>(false)
const selectedPortfolio = ref<IPortfolio | null>(null)

function openAdd() {
  selectedPortfolio.value = null
  showModal.value = true
}
function openEdit(portfolio: IPortfolio) {
  selectedPortfolio.value = { ...portfolio }
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
function savePortfolio(portfolio: IPortfolio) {
  if (portfolio.id) {
    store.updatePortfolio(portfolio)
  } else {
    store.addPortfolio(portfolio)
  }
  closeModal()
}
function deletePortfolio(id: string) {
  store.deletePortfolio(id)
}
</script>
<style scoped>
.p-datatable-sm .p-datatable-tbody > tr > td {
  padding: 0.5rem 1rem;
}
.p-datatable-sm .p-datatable-thead > tr > th {
  padding: 0.5rem 1rem;
  background: #f9fafb;
}
</style>
