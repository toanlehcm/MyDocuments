┌─────────────────────────────────────────────────────────────────┐
│ 🎯 ĐẶT VÀO lib/ KHI:                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✅ Được dùng bởi >= 2 features                                 │
│  ✅ Chứa business logic (không chỉ UI)                          │
│  ✅ Independent (không depend vào specific feature)             │
│  ✅ Reusable và maintainable                                    │
│                                                                  │
│  📝 EXAMPLES:                                                    │
│     - dynamic-form engine                                        │
│     - authentication utilities                                   │
│     - PDF generation logic                                       │
│     - validation schemas                                         │
│     - data transformers                                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 🎯 ĐẶT VÀO app/.../components/ KHI:                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✅ Specific cho 1 feature duy nhất                             │
│  ✅ Chứa UI-specific logic                                      │
│  ✅ Depend vào feature context                                  │
│  ✅ Không cần reuse ở features khác                             │
│                                                                  │
│  📝 EXAMPLES:                                                    │
│     - IntakeFormTabs (chỉ intake-form dùng)                    │
│     - TreatmentNoteHeader (chỉ treatment-note dùng)            │
│     - PatientSidebar (chỉ patient pages dùng)                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

✅ ĐẶT dynamic-form/ TRONG lib/

src/
└── lib/
    └── dynamic-form/
        └── constants/
            └── dynamicForm.constants.ts  // ← File của bạn

WHY:
1. ✅ Theo chuẩn React/Next.js community
2. ✅ Rõ ràng về mục đích (shared library)
3. ✅ Clean import paths
4. ✅ Scalable cho tương lai
5. ✅ Consistent với structure của các big techs