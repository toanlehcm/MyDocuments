```
help.md

workflow
 
git-workflow.md     # Branch strategy, commit convention
review-checklist.md # PR review checklist
deploy-runbook.md   # Deploy steps, rollback plan

kiểm tra toàn bộ source code, 3 file trên có file nào cần tạo cho project hiện tại không, vì 4 file trên đang dựa vào project reatJS có thể không phù hợp?

nếu cần thì tạo file trong folder workflow, không cần thì không tạo.
nêu lý do tạo và không tạo file.
```

Kết Luận cho 3 file đề xuất:
File	Cần tạo?	Lý do
git-workflow.md	❌ Không	3 file này là quy trình của team (con người), không phải context cho AI agent. AI agent không tạo branch, không commit, không deploy. Nó chỉ đọc/viết code. Việc document git strategy, PR review, deploy runbook thuộc về team wiki / Confluence — nơi cả team đọc, không phải .agent/ folder mà chỉ AI đọc.
review-checklist.md	❌ Không	Tương tự — PR checklist là cho reviewer (con người). Đã có 

anti-patterns.md
 + quality-gates/ để AI tự check code quality khi sinh code. AI không review PR trên GitHub/GitLab.
deploy-runbook.md	❌ Không	Deploy steps và rollback plan là quy trình ops, phụ thuộc vào infrastructure cụ thể (AWS, PM2, CI/CD pipeline...). AI không deploy. Và thông tin này nhạy cảm, không nên để trong .agent/ folder dễ bị share.
Tóm lại:
3 files này đều là quy trình team / ops — KHÔNG phải context cho AI agent khi sinh code. Chúng không liên quan đến ReactJS hay bất kỳ framework nào, mà đơn giản là không phù hợp để nằm trong .agent/.

Nơi phù hợp hơn cho 3 files này (nếu team cần):

Confluence / Notion — team wiki
CONTRIBUTING.md — trong repo root
README.md — section deploy
Không cần tạo file nào trong .agent/workflow/ 👍