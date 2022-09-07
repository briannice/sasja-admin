import OverviewCollection from '@/components/hoc/OverviewCollection'
import { COL_MATCHREPORT, DOC_MATCHREPORT } from '@/services/firebase/firestore'
import { MatchReportDocument, MatchReportDocumentData } from '@/types/documents'
import React from 'react'

export default function MatchReportPage() {
  return (
    <OverviewCollection<MatchReportDocument, MatchReportDocumentData>
      col={COL_MATCHREPORT}
      create={DOC_MATCHREPORT}
      name="Matchverslagen"
    >
      {({}) => <table>haha</table>}
    </OverviewCollection>
  )
}

MatchReportPage.Layout = 'root'
