import os

output_dir = "/Users/toanle/Documents/DEV/MyDocuments/SS English/phase-7/conversation-7-art-of-complaining/the-red-words"
os.makedirs(output_dir, exist_ok=True)

vocab_list = [
    {
        "filename": "Dismay.md",
        "word": "Dismay",
        "pos": "Noun",
        "ipa": "/dɪsˈmeɪ/",
        "meaning": "Sự sửng sốt, sự thất vọng hoặc lo lắng.",
        "v1_en": "A feeling of being unhappy and disappointed.",
        "v1_ipa": "/ə ˈfiːlɪŋ ʌv ˈbiːɪŋ ʌnˈhæpi ænd ˌdɪsəˈpɔɪntɪd/",
        "v1_vi": "Một cảm giác không vui và thất vọng.",
        "v2_en": "A strong feeling of disappointment or sadness when something unexpected or unpleasant happens.",
        "v2_ipa": "/ə strɔːŋ ˈfiːlɪŋ ʌv ˌdɪsəˈpɔɪntmənt ɔːr ˈsædnəs wɛn ˈsʌmθɪŋ ˌʌnɪkˈspɛktɪd ɔːr ʌnˈplɛzənt ˈhæpənz/",
        "v2_vi": "Một cảm giác thất vọng hoặc buồn bã mãnh liệt khi một điều gì đó bất ngờ hoặc khó chịu xảy ra.",
        "v3_en": "She looked at her low test score with dismay.",
        "v3_ipa": "/ʃi lʊkt æt hɜːr loʊ tɛst skɔːr wɪð dɪsˈmeɪ/",
        "v3_vi": "Cô ấy nhìn vào điểm bài thi thấp của mình với vẻ sửng sốt/thất vọng."
    },
    {
        "filename": "Prescriptions.md",
        "word": "Prescriptions",
        "pos": "Noun",
        "ipa": "/prɪˈskrɪpʃənz/",
        "meaning": "Đơn thuốc.",
        "v1_en": "A paper from a doctor that says what medicine you need.",
        "v1_ipa": "/ə ˈpeɪpər frəm ə ˈdɑːktər ðæt sɛz wʌt ˈmɛdəsən juː niːd/",
        "v1_vi": "Một tờ giấy từ bác sĩ ghi rõ loại thuốc bạn cần dùng.",
        "v2_en": "Written instructions from a physician that authorize a patient to receive a specific medicine.",
        "v2_ipa": "/ˈrɪtən ɪnˈstrʌkʃənz frəm ə fɪˈzɪʃən ðæt ˈɔːθəraɪz ə ˈpeɪʃənt tuː rɪˈsiːv ə spəˈsɪfɪk ˈmɛdəsən/",
        "v2_vi": "Các hướng dẫn bằng văn bản từ bác sĩ cho phép bệnh nhân nhận một loại thuốc cụ thể.",
        "v3_en": "The pharmacist is busy filling several prescriptions right now.",
        "v3_ipa": "/ðə ˈfɑːrməsɪst ɪz ˈbɪzi ˈfɪlɪŋ ˈsɛvrəl prɪˈskrɪpʃənz raɪt naʊ/",
        "v3_vi": "Dược sĩ đang bận chuẩn bị vài đơn thuốc ngay lúc này."
    },
    {
        "filename": "On Duty.md",
        "word": "On Duty",
        "pos": "Phrase",
        "ipa": "/ɑːn ˈduːti/",
        "meaning": "Đang làm việc, đang trong ca trực.",
        "v1_en": "Working at your job right now.",
        "v1_ipa": "/ˈwɜːrkɪŋ æt jʊər dʒɑːb raɪt naʊ/",
        "v1_vi": "Đang làm công việc của bạn ngay lúc này.",
        "v2_en": "Currently engaged in an assigned task or working during a scheduled shift.",
        "v2_ipa": "/ˈkɜːrəntli ɪnˈɡeɪdʒd ɪn ən əˈsaɪnd tæsk ɔːr ˈwɜːrkɪŋ ˈdʊrɪŋ ə ˈskɛdʒuːld ʃɪft/",
        "v2_vi": "Hiện đang thực hiện một nhiệm vụ được giao hoặc làm việc trong một ca trực đã lên lịch.",
        "v3_en": "A nurse is on duty 24 hours a day at the hospital.",
        "v3_ipa": "/ə nɜːrs ɪz ɑːn ˈduːti ˈtwɛnti-fɔːr ˈaʊərz ə deɪ æt ðə ˈhɑːspɪtəl/",
        "v3_vi": "Luôn có y tá trực 24 giờ một ngày tại bệnh viện."
    },
    {
        "filename": "Tablets.md",
        "word": "Tablets",
        "pos": "Noun",
        "ipa": "/ˈtæblɪts/",
        "meaning": "Viên thuốc, thuốc nén.",
        "v1_en": "Small, hard pieces of medicine that you swallow.",
        "v1_ipa": "/smɔːl, hɑːrd ˈpiːsɪz ʌv ˈmɛdəsən ðæt juː ˈswɑːloʊ/",
        "v1_vi": "Những mẩu thuốc nhỏ, cứng mà bạn nuốt.",
        "v2_en": "A small flat round piece of solid medicine that is swallowed whole.",
        "v2_ipa": "/ə smɔːl flæt raʊnd piːs ʌv ˈsɑːlɪd ˈmɛdəsən ðæt ɪz ˈswɑːloʊd hoʊl/",
        "v2_vi": "Một mảnh thuốc rắn nhỏ, phẳng, tròn được nuốt nguyên viên.",
        "v3_en": "The doctor told me to take two vitamin tablets every morning.",
        "v3_ipa": "/ðə ˈdɑːktər toʊld miː tuː teɪk tuː ˈvaɪtəmɪn ˈtæblɪts ˈɛvri ˈmɔːrnɪŋ/",
        "v3_vi": "Bác sĩ bảo tôi uống hai viên vitamin mỗi sáng."
    },
    {
        "filename": "Overdose.md",
        "word": "Overdose",
        "pos": "Noun/Verb",
        "ipa": "/ˈoʊvərˌdoʊs/",
        "meaning": "Dùng quá liều, sự quá liều.",
        "v1_en": "Taking too much of a medicine at one time.",
        "v1_ipa": "/ˈteɪkɪŋ tuː mʌtʃ ʌv ə ˈmɛdəsən æt wʌn taɪm/",
        "v1_vi": "Uống quá nhiều thuốc cùng một lúc.",
        "v2_en": "An excessive and dangerous dose of a drug or medicine.",
        "v2_ipa": "/ən ɪkˈsɛsɪv ænd ˈdeɪndʒərəs doʊs ʌv ə drʌɡ ɔːr ˈmɛdəsən/",
        "v2_vi": "Một liều lượng thuốc quá mức và nguy hiểm.",
        "v3_en": "Taking too many sleeping pills can lead to an accidental overdose.",
        "v3_ipa": "/ˈteɪkɪŋ tuː ˈmɛni ˈsliːpɪŋ pɪlz kæn liːd tuː ən ˌæksɪˈdɛntəl ˈoʊvərˌdoʊs/",
        "v3_vi": "Uống quá nhiều thuốc ngủ có thể dẫn đến việc quá liều do tai nạn."
    },
    {
        "filename": "Dissatisfaction.md",
        "word": "Dissatisfaction",
        "pos": "Noun",
        "ipa": "/ˌdɪsˌsætɪsˈfækʃən/",
        "meaning": "Sự không hài lòng, sự bất mãn.",
        "v1_en": "The feeling of not being happy with something.",
        "v1_ipa": "/ðə ˈfiːlɪŋ ʌv nɑːt ˈbiːɪŋ ˈhæpi wɪð ˈsʌmθɪŋ/",
        "v1_vi": "Cảm giác không hài lòng với điều gì đó.",
        "v2_en": "A lack of satisfaction or a feeling of disappointment with a product, service, or situation.",
        "v2_ipa": "/ə læk ʌv ˌsætɪsˈfækʃən ɔːr ə ˈfiːlɪŋ ʌv ˌdɪsəˈpɔɪntmənt wɪð ə ˈprɑːdʌkt, ˈsɜːrvɪs, ɔːr ˌsɪtʃuˈeɪʃən/",
        "v2_vi": "Thiếu sự hài lòng hoặc cảm giác thất vọng với một sản phẩm, dịch vụ hoặc tình huống.",
        "v3_en": "The customer expressed his dissatisfaction with the slow service.",
        "v3_ipa": "/ðə ˈkʌstəmər ɪkˈsprɛst hɪz ˌdɪsˌsætɪsˈfækʃən wɪð ðə sloʊ ˈsɜːrvɪs/",
        "v3_vi": "Khách hàng đã bày tỏ sự không hài lòng của mình với dịch vụ chậm chạp."
    },
    {
        "filename": "Insist.md",
        "word": "Insist",
        "pos": "Verb",
        "ipa": "/ɪnˈsɪst/",
        "meaning": "Khăng khăng, quả quyết, nhấn mạnh.",
        "v1_en": "To say strongly that something must happen.",
        "v1_ipa": "/tuː seɪ ˈstrɔːŋli ðæt ˈsʌmθɪŋ mʌst ˈhæpən/",
        "v1_vi": "Nói một cách mạnh mẽ rằng một điều gì đó phải xảy ra.",
        "v2_en": "To demand forcefully or state something firmly, not accepting refusal.",
        "v2_ipa": "/tuː dɪˈmænd ˈfɔːrsfəli ɔːr steɪt ˈsʌmθɪŋ ˈfɜːrmli, nɑːt ækˈsɛptɪŋ rɪˈfjuːzəl/",
        "v2_vi": "Đưa ra yêu cầu một cách mạnh mẽ hoặc tuyên bố điều gì đó một cách chắc chắn, không chấp nhận sự từ chối.",
        "v3_en": "I insist that we leave now or we will be late.",
        "v3_ipa": "/aɪ ɪnˈsɪst ðæt wiː liːv naʊ ɔːr wiː wɪl biː leɪt/",
        "v3_vi": "Tôi khăng khăng rằng chúng ta phải đi ngay bây giờ nếu không sẽ bị trễ."
    },
    {
        "filename": "Consumer Protection Agency.md",
        "word": "Consumer Protection Agency",
        "pos": "Noun phrase",
        "ipa": "/kənˈsuːmər prəˈtɛkʃən ˈeɪdʒənsi/",
        "meaning": "Cơ quan bảo vệ người tiêu dùng.",
        "v1_en": "A group that helps people if a company treats them unfairly.",
        "v1_ipa": "/ə ɡruːp ðæt hɛlps ˈpiːpəl ɪf ə ˈkʌmpəni triːts ðɛm ʌnˈfɛrli/",
        "v1_vi": "Một nhóm giúp đỡ mọi người nếu một công ty đối xử với họ không công bằng.",
        "v2_en": "A government or non-profit organization that defends the rights and interests of buyers.",
        "v2_ipa": "/ə ˈɡʌvərnmənt ɔːr nɑːn-ˈprɑːfɪt ˌɔːrɡənɪˈzeɪʃən ðæt dɪˈfɛndz ðə raɪts ænd ˈɪntrəsts ʌv ˈbaɪərz/",
        "v2_vi": "Một tổ chức chính phủ hoặc phi lợi nhuận bảo vệ quyền và lợi ích của người mua.",
        "v3_en": "If the shop won't give you a refund, you should contact a consumer protection agency.",
        "v3_ipa": "/ɪf ðə ʃɑːp woʊnt ɡɪv juː ə ˈriːfʌnd, juː ʃʊd ˈkɑːntækt ə kənˈsuːmər prəˈtɛkʃən ˈeɪdʒənsi/",
        "v3_vi": "Nếu cửa hàng không hoàn tiền cho bạn, bạn nên liên hệ với cơ quan bảo vệ người tiêu dùng."
    },
    {
        "filename": "Assistance.md",
        "word": "Assistance",
        "pos": "Noun",
        "ipa": "/əˈsɪstəns/",
        "meaning": "Sự giúp đỡ, sự hỗ trợ.",
        "v1_en": "Helping someone to do something.",
        "v1_ipa": "/ˈhɛlpɪŋ ˈsʌmwʌn tuː duː ˈsʌmθɪŋ/",
        "v1_vi": "Giúp đỡ ai đó làm việc gì đó.",
        "v2_en": "Help or support provided to a person, often in a professional context.",
        "v2_ipa": "/hɛlp ɔːr səˈpɔːrt prəˈvaɪdɪd tuː ə ˈpɜːrsən, ˈɔːfən ɪn ə prəˈfɛʃənəl ˈkɑːntɛkst/",
        "v2_vi": "Sự giúp đỡ hoặc hỗ trợ cung cấp cho một người, thường là trong bối cảnh chuyên nghiệp.",
        "v3_en": "Do you need any assistance with those heavy bags?",
        "v3_ipa": "/duː juː niːd ˈɛni əˈsɪstəns wɪð ðoʊz ˈhɛvi bæɡz/",
        "v3_vi": "Bạn có cần bất kỳ sự giúp đỡ nào với những chiếc túi nặng đó không?"
    },
    {
        "filename": "Sign Off.md",
        "word": "Sign Off",
        "pos": "Phrasal verb",
        "ipa": "/saɪn ɔːf/",
        "meaning": "Ký tên kết thúc, phê duyệt chính thức.",
        "v1_en": "To finish something or say it is okay with your name.",
        "v1_ipa": "/tuː ˈfɪnɪʃ ˈsʌmθɪŋ ɔːr seɪ ɪt ɪz ˌoʊˈkeɪ wɪð jʊər neɪm/",
        "v1_vi": "Hoàn tất điều gì đó hoặc xác nhận nó ổn bằng tên của bạn.",
        "v2_en": "To give official approval for something, or to end a letter or a broadcast.",
        "v2_ipa": "/tuː ɡɪv əˈfɪʃəl əˈpruːvəl fɔːr ˈsʌmθɪŋ, ɔːr tuː ɛnd ə ˈlɛtər ɔːr ə ˈbrɔːdkæst/",
        "v2_vi": "Phê duyệt chính thức cho một điều gì đó, hoặc kết thúc một lá thư hoặc một chương trình phát sóng.",
        "v3_en": "The manager needs to sign off on the project before we can start.",
        "v3_ipa": "/ðə ˈmænɪdʒər niːdz tuː saɪn ɔːf ɑːn ðə ˈprɑːdʒɛkt bɪˈfɔːr wiː kæn stɑːrt/",
        "v3_vi": "Người quản lý cần phê duyệt dự án trước khi chúng ta có thể bắt đầu."
    }
]

template = """# {word}
* **Từ loại:** {pos}
* **IPA:** {ipa}
* **Nghĩa tiếng Việt:** {meaning}

**1. Cách giải thích đơn giản nhất (Dành cho giao tiếp hàng ngày)**
> {v1_en}
> 
> {v1_ipa}
> 
> {v1_vi}

**2. Cách giải thích chi tiết hơn (Dùng từ vựng tốt hơn một chút)**
> {v2_en}
> 
> {v2_ipa}
> 
> {v2_vi}

**3. Đưa ra ví dụ thực tế (Cách tốt nhất để người nghe hiểu ngay)**
> {v3_en}
> 
> {v3_ipa}
> 
> {v3_vi}
"""

for v in vocab_list:
    filepath = os.path.join(output_dir, v["filename"])
    content = template.format(**v)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Successfully generated {len(vocab_list)} markdown files in {output_dir}")
