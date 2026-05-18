# Implementation Plan - Creating Travel & Tourism Vocabulary Files (Phase 8)

We will create 28 comprehensive, highly-structured markdown files for the vocabulary list in `d:\Sources\MyDocuments\SS English\phase-8\skill-8-travel-tourism\the-other-words`.

Each file will follow a pristine structure containing:
1. **Title** (The word capitalized)
2. **Part of Speech (Từ loại)**, **IPA**, **Vietnamese Translation**
3. **Three Levels of Explanations** (simple English for teaching/explaining to others):
   - **Level 1 (Simple - A2/B1)**: Basic, everyday words for beginners.
   - **Level 2 (Natural - B2)**: More descriptive and natural English.
   - **Level 3 (Advanced - C1)**: Detailed, sophisticated, or professional context.
4. **Three Levels of Example Sentences** with full IPA transcription and Vietnamese translation:
   - **Example 1 (Everyday Context)** + IPA + Translation
   - **Example 2 (Travel/Tourism Context)** + IPA + Translation
   - **Example 3 (Advanced/Collocative Context)** + IPA + Translation

---

## Vocabulary Data Sheet

Here is the exact data mapping for the 28 words:

| # | Word | Part of Speech | IPA | Vietnamese Meaning |
|---|------|----------------|-----|-------------------|
| 1 | ancient | Adjective | `/ˈeɪn.ʃənt/` | Cổ kính, cổ xưa |
| 2 | fancy | Adjective / Verb | `/ˈfæn.si/` | Sang trọng, xa hoa; thích |
| 3 | architects | Noun (plural) | `/ˈɑːr.kə.tekts/` | Kiến trúc sư |
| 4 | accommodations | Noun (plural) | `/əˌkɑː.məˈdeɪ.ʃənz/` | Chỗ ở, nơi lưu trú |
| 5 | canals | Noun (plural) | `/kəˈnælz/` | Kênh đào |
| 6 | gondola | Noun | `/ˈɡɑːn.də.lə/` | Thuyền lá Venice (thuyền độc mộc đặc trưng) |
| 7 | enhance | Verb | `/ɪnˈhæns/` | Nâng cao, tăng cường, làm đẹp thêm |
| 8 | overall | Adjective / Adverb | `/ˌoʊ.vɚˈɑːl/` | Tổng thể, nhìn chung |
| 9 | circumstances | Noun (plural) | `/ˈsɜːr.kəm.stæn.sɪz/` | Hoàn cảnh, tình huống, trường hợp |
| 10 | certainly | Adverb | `/ˈsɜːr.tən.li/` | Chắc chắn, dĩ nhiên |
| 11 | vibrant | Adjective | `/ˈvaɪ.brənt/` | Sôi động, rực rỡ, đầy sức sống |
| 12 | enthusiasm | Noun | `/ɪnˈθuː.zi.æz.əm/` | Sự nhiệt huyết, lòng hăng hái |
| 13 | immersive | Adjective | `/sub/ɪˈmɜːr.sɪv/` | Đắm chìm, chân thực (trải nghiệm) |
| 14 | itinerary | Noun | `/aɪˈtɪn.ə.rer.i/` | Lịch trình chuyến đi |
| 15 | nonetheless | Adverb | `/ˌnʌn.ðəˈles/` | Tuy nhiên, dù sao thì |
| 16 | dawn | Noun / Verb | `/dɔːn/` | Bình minh, rạng đông |
| 17 | sunset | Noun | `/ˈsʌn.set/` | Hoàng hôn, lúc mặt trời lặn |
| 18 | potentially | Adverb | `/pəˈten.ʃəl.i/` | Có tiềm năng, có khả năng xảy ra |
| 19 | affordable | Adjective | `/əˈfɔːr.də.bl/` | Giá cả phải chăng, vừa túi tiền |
| 20 | delighted | Adjective | `/dɪˈlaɪ.tɪd/` | Rất vui mừng, vô cùng hài lòng |
| 21 | intimate | Adjective | `/ˈɪn.tɪ.mət/` | Thân mật, ấm cúng, riêng tư |
| 22 | perhaps | Adverb | `/pərˈhæps/` | Có lẽ, có thể |
| 23 | cozy | Adjective | `/ˈkoʊ.zi/` | Ấm cúng, dễ chịu |
| 24 | charm | Noun / Verb | `/tʃɑːrm/` | Sức hút, vẻ đẹp quyến rũ; mê hoặc |
| 25 | venues | Noun (plural) | `/ˈven.juːz/` | Địa điểm (tổ chức sự kiện/gặp gỡ) |
| 26 | canal-side | Noun / Adjective | `/kəˈnæl.saɪd/` | Bờ kênh, ven kênh |
| 27 | in terms of | Phrase | `/ɪn tɜːrmz ʌv/` | Xét về mặt, về mặt |
| 28 | bouquet | Noun | `/buˈkeɪ/` | Bó hoa; hương thơm (của rượu) |

---

## Proposed Generation Approach

Instead of manually invoking `write_to_file` 28 times (which takes too many steps and increases token usage), we will write a structured Python script in the scratch directory:
- Path: `d:\Sources\MyDocuments\SS English\scratch\generate_vocabulary.py`
- This script will define the data for all 28 words in a clean dictionary and write them into the target directory `d:\Sources\MyDocuments\SS English\phase-8\skill-8-travel-tourism\the-other-words\` with absolute formatting precision.

### Code Formatting Template
Each generated file will exactly follow this format:

```markdown
# [Word_Capitalized]
* **Từ loại:** [Part of Speech]
* **IPA:** [IPA]
* **Nghĩa tiếng Việt:** [Vietnamese meaning]

**1. Cách giải thích đơn giản nhất (Dành cho giao tiếp hàng ngày - Level 1)**
> [Simple Explanation]
> [Simple Explanation IPA]
> [Simple Explanation Vietnamese]

**2. Cách giải thích chi tiết hơn (Dùng từ vựng tốt hơn - Level 2)**
> [Natural Explanation]
> [Natural Explanation IPA]
> [Natural Explanation Vietnamese]

**3. Cách giải thích chuyên nghiệp / Bối cảnh du lịch (Level 3)**
> [Advanced/Travel Explanation]
> [Advanced/Travel Explanation IPA]
> [Advanced/Travel Explanation Vietnamese]

**4. Các ví dụ thực tế tương ứng (3 Versions)**

* **Version 1 (Daily / Simple Context):**
  > [Example 1]
  > [Example 1 IPA]
  > [Example 1 Vietnamese]

* **Version 2 (Travel / Tourism Context):**
  > [Example 2]
  > [Example 2 IPA]
  > [Example 2 Vietnamese]

* **Version 3 (Advanced / Expressive Context):**
  > [Example 3]
  > [Example 3 IPA]
  > [Example 3 Vietnamese]
```

## Verification Plan

1. Run the Python generator script on the local environment using PowerShell:
   `python d:\Sources\MyDocuments\SS English\scratch\generate_vocabulary.py`
2. Once complete, inspect at least 3 generated markdown files to verify that they contain all necessary components (Word title, Part of speech, IPA, Vietnamese meanings, the three levels of explanation, and the three example versions).
3. Provide the user with a final summary and clickable links to all generated files!
