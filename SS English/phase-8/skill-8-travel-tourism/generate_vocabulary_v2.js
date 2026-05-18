const fs = require('fs');
const path = require('path');

// Define the vocabulary data
const vocabulary = [
    {
        filename: "Ancient.md",
        word: "Ancient",
        pos: "Adjective",
        ipa: "/ˈeɪn.ʃənt/",
        meaning: "Cổ kính, cổ xưa, có từ lâu đời.",
        exp_eng: "Something that is very, very old, from a long time ago in history.",
        exp_ipa: "/ˈsʌmθɪŋ ðæt ɪz ˈvɛri, ˈvɛri oʊld, frʌm ə lɔːŋ taɪm əˈɡoʊ ɪn ˈhɪstəri/",
        exp_vie: "Một thứ gì đó rất, rất cũ, từ thời xa xưa trong lịch sử.",
        ex_eng: "We visited the ancient temple that was built over a thousand years ago.",
        ex_ipa: "/wi ˈvɪzɪtɪd ðə ˈeɪnʃənt ˈtɛmpl ðæt wʌz bɪlt ˈoʊvər ə ˈθaʊznd jɪərz əˈɡoʊ/",
        ex_vie: "Chúng tôi đã đến thăm ngôi đền cổ được xây dựng cách đây hơn một nghìn năm."
    },
    {
        filename: "Fancy.md",
        word: "Fancy",
        pos: "Adjective / Verb",
        ipa: "/ˈfæn.si/",
        meaning: "Sang trọng, đắt tiền, đẹp đẽ; thích.",
        exp_eng: "Expensive, modern, and fashionable.",
        exp_ipa: "/ɪkˈspɛnsɪv, ˈmɑːdərn, ænd ˈfæʃnəbl/",
        exp_vie: "Đắt tiền, hiện đại và thời trang.",
        ex_eng: "They went to a fancy restaurant by the river for their anniversary.",
        ex_ipa: "/ðeɪ wɛnt tu ə ˈfænsi ˈrɛstrɑːnt baɪ ðə ˈrɪvər fɔːr ðɛr ˌænɪˈvɜːrsəri/",
        ex_vie: "Họ đã đến một nhà hàng sang trọng ven sông để kỷ niệm ngày cưới."
    },
    {
        filename: "Architects.md",
        word: "Architects",
        pos: "Noun (plural)",
        ipa: "/ˈɑːr.kə.tekts/",
        meaning: "Kiến trúc sư (số nhiều).",
        exp_eng: "People whose job is to design buildings and make sure they are safe.",
        exp_ipa: "/ˈpiːpl huːz dʒɑːb ɪz tu dɪˈzaɪn ˈbɪldɪŋz ænd meɪk ʃʊr ðeɪ ɑːr seɪf/",
        exp_vie: "Những người có công việc là thiết kế các tòa nhà và đảm bảo chúng an toàn.",
        ex_eng: "The architects designed a beautiful museum in the center of the city.",
        ex_ipa: "/ði ˈɑːrkɪtɛkts dɪˈzaɪnd ə ˈbjuːtɪfl mjuˈziːəm ɪn ðə ˈsɛntər ʌv ðə ˈsɪti/",
        ex_vie: "Các kiến trúc sư đã thiết kế một bảo tàng tuyệt đẹp ở trung tâm thành phố."
    },
    {
        filename: "Accommodations.md",
        word: "Accommodations",
        pos: "Noun (plural)",
        ipa: "/əˌkɑː.məˈdeɪ.ʃənz/",
        meaning: "Chỗ ở, nơi lưu trú (như khách sạn, nhà nghỉ).",
        exp_eng: "Places for people to stay or live, especially when travelling.",
        exp_ipa: "/ˈpleɪsɪz fɔːr ˈpiːpl tu steɪ ɔːr lɪv, ɪˈspɛʃəli wɛn ˈtrævəlɪŋ/",
        exp_vie: "Những nơi để mọi người ở hoặc sinh sống, đặc biệt là khi đi du lịch.",
        ex_eng: "It is highly recommended to book your accommodations early during the summer.",
        ex_ipa: "/sub/ɪt ɪz ˈhaɪli ˌrɛkəˈmɛndɪd tu bʊk jɔːr əˌkɑːməˈdeɪʃənz ˈɜːrli ˈdʒʊərɪŋ ðə ˈsʌmər/",
        ex_vie: "Bạn rất nên đặt chỗ ở sớm trong suốt kỳ nghỉ hè."
    },
    {
        filename: "Canals.md",
        word: "Canals",
        pos: "Noun (plural)",
        ipa: "/kəˈnælz/",
        meaning: "Kênh đào (số nhiều).",
        exp_eng: "Man-made rivers built for boats to travel through or to carry water.",
        exp_ipa: "/ˌmænˈmeɪd ˈrɪvərz bɪlt fɔːr boʊts tu ˈtrævl θruː ɔːr tu ˈkæri ˈwɔːtər/",
        exp_vie: "Những con sông nhân tạo được xây dựng để tàu thuyền đi qua hoặc để dẫn nước.",
        ex_eng: "Venice is famous for its beautiful canals and ancient stone bridges.",
        ex_ipa: "/ˈvɛnɪs ɪz ˈfeɪməs fɔːr ɪts ˈbjuːtɪfl kəˈnælz ænd ˈeɪnʃənt stoʊn ˈbrɪdʒɪz/",
        ex_vie: "Venice nổi tiếng với những con kênh đào tuyệt đẹp và những cây cầu đá cổ kính."
    },
    {
        filename: "Gondola.md",
        word: "Gondola",
        pos: "Noun",
        ipa: "/ˈɡɑːn.də.lə/",
        meaning: "Thuyền lá Venice (thuyền độc mộc đặc trưng).",
        exp_eng: "A long, narrow boat with a flat bottom, used on the canals of Venice.",
        exp_ipa: "/ə lɔːŋ, ˈnæroʊ boʊt wɪð ə flæt ˈbɑːtəm, juːzd ɑːn ðə kəˈnælz ʌv ˈvɛnɪs/",
        exp_vie: "Một chiếc thuyền dài, hẹp với đáy phẳng, được sử dụng trên các kênh đào ở Venice.",
        ex_eng: "Taking a ride in a gondola is a romantic experience for tourists in Venice.",
        ex_ipa: "/ˈteɪkɪŋ ə raɪd ɪn ə ˈɡɑːndələ ɪz ə roʊˈmæntɪk ɪkˈspɪriəns fɔːr ˈtʊrɪsts ɪn ˈvɛnɪs/",
        ex_vie: "Đi thuyền lá gondola là một trải nghiệm lãng mạn cho du khách ở Venice."
    },
    {
        filename: "Enhance.md",
        word: "Enhance",
        pos: "Verb",
        ipa: "/sub/ɪnˈhæns/",
        meaning: "Nâng cao, cải thiện, làm tăng thêm (vẻ đẹp, giá trị, chất lượng).",
        exp_eng: "To improve something, or make it look better or more valuable.",
        exp_ipa: "/tu ɪmˈpruːv ˈsʌmθɪŋ, ɔːr meɪk ɪt lʊk ˈbɛtər ɔːr mɔːr ˈvæljuəbl/",
        exp_vie: "Cải thiện điều gì đó, hoặc làm cho nó trông đẹp hơn hoặc có giá trị hơn.",
        ex_eng: "Soft music and warm lighting will enhance the cozy atmosphere of the cafe.",
        ex_ipa: "/sɒft ˈmjuːzɪk ænd wɔːrm ˈlaɪtɪŋ wɪl ɪnˈhæns ðə ˈkoʊzi ˈætməsfɪər ʌv ðə kæˈfeɪ/",
        ex_vie: "Nhạc nhẹ và ánh sáng ấm áp sẽ làm tăng thêm bầu không khí ấm cúng của quán cà phê."
    },
    {
        filename: "Overall.md",
        word: "Overall",
        pos: "Adjective / Adverb",
        ipa: "/ˌoʊ.vɚˈɑːl/",
        meaning: "Nhìn chung, tổng thể, toàn bộ.",
        exp_eng: "Considering everything, in general, or including all parts.",
        exp_ipa: "/kənˈsɪdərɪŋ ˈɛvriθɪŋ, ɪn ˈdʒɛnərəl, ɔːr ɪnˈkluːdɪŋ ɔːl pɑːrts/",
        exp_vie: "Xem xét mọi thứ, nhìn chung, hoặc bao gồm tất cả các phần.",
        ex_eng: "The overall cost of the vacation was much cheaper than we expected.",
        ex_ipa: "/ði ˈoʊvərɔːl kɔːst ʌv ðə veɪˈkeɪʃn wʌz mʌtʃ ˈtʃiːpər ðæn wi ɪkˈspɛktɪd/",
        ex_vie: "Chi phí tổng thể của kỳ nghỉ rẻ hơn nhiều so với chúng tôi mong đợi."
    },
    {
        filename: "Circumstances.md",
        word: "Circumstances",
        pos: "Noun (plural)",
        ipa: "/ˈsɜːr.kəm.stæn.sɪz/",
        meaning: "Hoàn cảnh, trường hợp, tình huống thực tế.",
        exp_eng: "The facts or events that affect a situation or a person.",
        exp_ipa: "/ðə fækts ɔːr ɪˈvɛnts ðæt əˈfɛkt ə ˌsɪtʃuˈeɪʃn ɔːr ə ˈpɜːrsn/",
        exp_vie: "Các sự thật hoặc sự kiện ảnh hưởng đến một tình huống hoặc một con người.",
        ex_eng: "Due to unforeseen circumstances, we had to cancel our flight to Tokyo.",
        ex_ipa: "/duː tu ˌʌnfɔːrˈsiːn ˈsɜːrkəmstænsɪz, wi hæd tu ˈkænsl ˈaʊər flaɪt tu ˈtoʊkioʊ/",
        ex_vie: "Do những hoàn cảnh không lường trước được, chúng tôi đã phải hủy chuyến bay đến Tokyo."
    },
    {
        filename: "Certainly.md",
        word: "Certainly",
        pos: "Adverb",
        ipa: "/ˈsɜːr.tən.li/",
        meaning: "Chắc chắn, dĩ nhiên (nhấn mạnh sự đồng ý hoặc khẳng định).",
        exp_eng: "Surely, without any doubt, or to say 'yes' strongly.",
        exp_ipa: "/ˈʃʊrli, wɪˈðaʊt ɛni daʊt, ɔːr tu seɪ jɛs strɔːŋli/",
        exp_vie: "Chắc chắn, không có bất kỳ nghi ngờ nào, hoặc để nói 'đồng ý' một cách mạnh mẽ.",
        ex_eng: "I will certainly recommend this lovely hotel to all of my friends.",
        ex_ipa: "/aɪ wɪl ˈsɜːrtnli ˌrɛkəˈmɛnd ðɪs ˈlʌvli hoʊˈtɛl tu ɔːl ʌv maɪ frɛndz/",
        ex_vie: "Tôi chắc chắn sẽ giới thiệu khách sạn đáng yêu này cho tất cả bạn bè của mình."
    },
    {
        filename: "Vibrant.md",
        word: "Vibrant",
        pos: "Adjective",
        ipa: "/ˈvaɪ.brənt/",
        meaning: "Sôi động, rực rỡ, tràn đầy sức sống.",
        exp_eng: "Full of energy, life, and bright colors.",
        exp_ipa: "/fʊl ʌv ˈɛnərdʒi, laɪf, ænd braɪt ˈkʌlərz/",
        exp_vie: "Tràn đầy năng lượng, cuộc sống và màu sắc tươi sáng.",
        ex_eng: "Bangkok is famous for its vibrant street markets and exciting nightlife.",
        ex_ipa: "/ˈbæŋkɒk ɪz ˈfeɪməs fɔːr ɪts ˈvaɪbrənt striːt ˈmɑːrkɪts ænd ɪkˈsaɪtɪŋ ˈnaɪtlaɪf/",
        ex_vie: "Bangkok nổi tiếng với những khu chợ đường phố sôi động và cuộc sống về đêm thú vị."
    },
    {
        filename: "Enthusiasm.md",
        word: "Enthusiasm",
        pos: "Noun",
        ipa: "/ɪnˈθuː.zi.æz.əm/",
        meaning: "Sự nhiệt huyết, lòng hăng hái, niềm say mê lớn.",
        exp_eng: "A strong feeling of excitement and interest in something.",
        exp_ipa: "/ə strɔːŋ ˈfiːlɪŋ ʌv ɪkˈsaɪtmənt ænd ˈɪntrəst ɪn ˈsʌmθɪŋ/",
        exp_vie: "Một cảm giác hào hứng và quan tâm mạnh mẽ đến một điều gì đó.",
        ex_eng: "The tour guide showed great enthusiasm while explaining the local history.",
        ex_ipa: "/sub/ðə tʊr ɡaɪd ʃoʊd ɡreɪt ɪnˈθuːziæzəm waɪl ɪkˈspleɪnɪŋ ðə ˈloʊkl ˈhɪstəri/",
        ex_vie: "Hướng dẫn viên du lịch đã thể hiện sự nhiệt huyết rất lớn khi giải thích lịch sử địa phương."
    },
    {
        filename: "Immersive.md",
        word: "Immersive",
        pos: "Adjective",
        ipa: "/ɪˈmɜːr.sɪv/",
        meaning: "Đắm chìm, chân thực (mang lại cảm giác hoàn toàn hòa mình vào môi trường).",
        exp_eng: "Making you feel completely involved in an activity or environment.",
        exp_ipa: "/ˈmeɪkɪŋ juː fiːl kəmˈpliːtli ɪnˈvɑːlvd ɪn æn ækˈtɪvəti ɔːr ɪnˈvaɪrənmənt/",
        exp_vie: "Làm cho bạn cảm thấy hoàn toàn tham gia vào một hoạt động hoặc môi trường.",
        ex_eng: "Living with a local family provides an immersive language-learning experience.",
        ex_ipa: "/ˈlɪvɪŋ wɪð ə ˈloʊkl ˈfæmili prəˈvaɪdz ən ɪˈmɜːrsɪv ˈlæŋɡwɪdʒ ˈlɜːrnɪŋ ɪkˈspɪriəns/",
        ex_vie: "Sống chung với một gia đình bản xứ mang lại một trải nghiệm học ngôn ngữ đắm chìm thực tế."
    },
    {
        filename: "Itinerary.md",
        word: "Itinerary",
        pos: "Noun",
        ipa: "/aɪˈtɪn.ə.rer.i/",
        meaning: "Lịch trình chi tiết của một chuyến đi.",
        exp_eng: "A detailed plan or map of a journey, including places to visit.",
        exp_ipa: "/ə dɪˈteɪld plæn ɔːr mæp ʌv ə ˈdʒɜːrni, ɪnˈkluːdɪŋ ˈpleɪsɪz tu ˈvɪzɪt/",
        exp_vie: "Một kế hoạch hoặc bản đồ chi tiết của một hành trình, bao gồm các địa điểm sẽ ghé thăm.",
        ex_eng: "We have a very busy itinerary for our three-day trip to Paris.",
        ex_ipa: "/wi hæv ə ˈvɛri ˈbɪzi aɪˈtɪnəreri fɔːr ˈaʊər θriː deɪ trɪp tu ˈpærɪs/",
        ex_vie: "Chúng tôi có một lịch trình rất bận rộn cho chuyến đi ba ngày tới Paris."
    },
    {
        filename: "Nonetheless.md",
        word: "Nonetheless",
        pos: "Adverb",
        ipa: "/ˌnʌn.ðəˈles/",
        meaning: "Tuy nhiên, mặc dù vậy, dù sao đi nữa.",
        exp_eng: "However, or despite what has just been said.",
        exp_ipa: "/haʊˈɛvər, ɔːr dɪˈspaɪt wʌt hæz dʒʌst biːn sɛd/",
        exp_vie: "Tuy nhiên, hoặc mặc dù những gì vừa được nói.",
        ex_eng: "The weather was rainy; nonetheless, we enjoyed our outdoor walking tour.",
        ex_ipa: "/ðə ˈwɛðər wʌz ˈreɪni; ˌnʌnðəˈlɛs, wi ɪnˈdʒɔɪd ˈaʊər ˈaʊtdɔːr ˈwɔːkɪŋ tʊr/",
        ex_vie: "Thời tiết có mưa; tuy nhiên, chúng tôi vẫn tận hưởng chuyến đi bộ tham quan ngoài trời của mình."
    },
    {
        filename: "Dawn.md",
        word: "Dawn",
        pos: "Noun / Verb",
        ipa: "/dɔːn/",
        meaning: "Bình minh, rạng đông (khi mặt trời bắt đầu mọc).",
        exp_eng: "The early morning when light first appears in the sky.",
        exp_ipa: "/ði ˈɜːrli ˈmɔːrnɪŋ wɛn laɪt fɜːrst əˈpɪərz ɪn ðə skaɪ/",
        exp_vie: "Buổi sáng sớm khi ánh sáng lần đầu tiên xuất hiện trên bầu trời.",
        ex_eng: "We woke up at dawn to watch the beautiful sunrise over the ocean.",
        ex_ipa: "/wi woʊkt ʌp æt dɔːn tu wɑːtʃ ðə ˈbjuːtɪfl ˈsʌnraɪz ˈoʊvər ði ˈoʊʃn/",
        ex_vie: "Chúng tôi thức dậy lúc bình minh để ngắm cảnh mặt trời mọc tuyệt đẹp trên đại dương."
    },
    {
        filename: "Sunset.md",
        word: "Sunset",
        pos: "Noun",
        ipa: "/ˈsʌn.set/",
        meaning: "Hoàng hôn, lúc mặt trời lặn.",
        exp_eng: "The time in the evening when the sun disappears from the sky.",
        exp_ipa: "/ðə taɪm ɪn ðə ˈiːvnɪŋ wɛn ðə sʌn ˌdɪsəˈpɪərz frʌm ðə skaɪ/",
        exp_vie: "Thời gian vào buổi tối khi mặt trời biến mất khỏi bầu trời.",
        ex_eng: "The view of the sunset from the top of the mountain was absolutely amazing.",
        ex_ipa: "/ðə vjuː ʌv ðə ˈsʌnset frʌm ðə tɑːp ʌv ðə ˈmaʊntn wʌz ˌæbsəˈluːtli əˈmeɪzɪŋ/",
        ex_vie: "Cảnh hoàng hôn nhìn từ đỉnh núi hoàn toàn tuyệt vời."
    },
    {
        filename: "Potentially.md",
        word: "Potentially",
        pos: "Adverb",
        ipa: "/pəˈten.ʃəl.i/",
        meaning: "Có tiềm năng, có khả năng xảy ra trong tương lai.",
        exp_eng: "Possibly, or having the potential to happen or become true.",
        exp_ipa: "/ˈpɑːsəbli, ɔːr ˈhævɪŋ ðə pəˈtɛnʃl tu ˈhæpən ɔːr bɪˈkʌm truː/",
        exp_vie: "Có thể, hoặc có tiềm năng xảy ra hoặc trở thành sự thật.",
        ex_eng: "Traveling alone can potentially help you become more independent and confident.",
        ex_ipa: "/ˈtrævəlɪŋ əˈloʊn kæn pəˈtɛnʃəli hɛlp ju bɪˈkʌm mɔːr ˌɪndɪˈpɛndənt ænd ˈkɑːnfɪdənt/",
        ex_vie: "Đi du lịch một mình có khả năng giúp bạn trở nên tự lập và tự tin hơn."
    },
    {
        filename: "Affordable.md",
        word: "Affordable",
        pos: "Adjective",
        ipa: "/əˈfɔːr.də.bl/",
        meaning: "Giá cả phải chăng, vừa túi tiền.",
        exp_eng: "Not too expensive, something you have enough money to buy.",
        exp_ipa: "/nɑːt tuː ɪkˈspɛnsɪv, ˈsʌmθɪŋ ju hæv ɪˈnʌf ˈmʌni tu baɪ/",
        exp_vie: "Không quá đắt, thứ gì đó bạn có đủ tiền để mua.",
        ex_eng: "The hostel offers affordable rooms for budget travelers and backpackers.",
        ex_ipa: "/ðə ˈhɑːstl ˈɔːfərz əˈfɔːrdəbl ruːmz fɔːr ˈbʌdʒɪt ˈtrævələrz ænd ˈbækˌpækərz/",
        ex_vie: "Nhà nghỉ bình dân cung cấp những phòng giá cả phải chăng cho khách du lịch tiết kiệm và dân phượt."
    },
    {
        filename: "Delighted.md",
        word: "Delighted",
        pos: "Adjective",
        ipa: "/dɪˈlaɪ.tɪd/",
        meaning: "Rất vui mừng, vô cùng hài lòng.",
        exp_eng: "Very happy, pleased, or satisfied with something.",
        exp_ipa: "/ˈvɛri ˈhæpi, pliːzd, ɔːr ˈsætɪsfaɪd wɪð ˈsʌmθɪŋ/",
        exp_vie: "Rất hạnh phúc, hài lòng hoặc thỏa mãn với điều gì đó.",
        ex_eng: "She was delighted to receive a free upgrade to a luxury suite room.",
        ex_ipa: "/sub/ʃi wʌz dɪˈlaɪtɪd tu rɪˈsiːv ə friː ˈʌpɡreɪd tu ə ˈlʌkʃəri swiːt ruːm/",
        ex_vie: "Cô ấy đã rất vui mừng khi nhận được một nâng cấp miễn phí lên phòng suite sang trọng."
    },
    {
        filename: "Intimate.md",
        word: "Intimate",
        pos: "Adjective",
        ipa: "/ˈsub/ɪn.tɪ.mət/",
        meaning: "Ấm cúng, thân mật, mang tính riêng tư sâu sắc.",
        exp_eng: "Cozy, quiet, private, and very friendly.",
        exp_ipa: "/ˈkoʊzi, ˈkwaɪət, ˈpraɪvət, ænd ˈvɛri ˈfrɛndli/",
        exp_vie: "Ấm cúng, yên tĩnh, riêng tư và rất thân thiện.",
        ex_eng: "The restaurant has an intimate atmosphere, perfect for a romantic dinner.",
        ex_ipa: "/ðə ˈrɛstrɑːnt hæz ən ˈɪntɪmət ˈætməsfɪər, ˈpɜːrfɪkt fɔːr ə roʊˈmæntɪk ˈdɪnər/",
        ex_vie: "Nhà hàng có bầu không khí ấm cúng riêng tư, hoàn hảo cho một bữa tối lãng mạn."
    },
    {
        filename: "Perhaps.md",
        word: "Perhaps",
        pos: "Adverb",
        ipa: "/pərˈhæps/",
        meaning: "Có lẽ, có thể (dùng khi không chắc chắn).",
        exp_eng: "Maybe, possibly, or used when you are not 100% sure.",
        exp_ipa: "/ˈmeɪbi, ˈpɑːsəbli, ɔːr juːzd wɛn ju ɑːr nɑːt wʌn ˈhʌndrəd pəˈsɛnt ʃʊr/",
        exp_vie: "Có thể, có khả năng, hoặc được sử dụng khi bạn không chắc chắn 100%.",
        ex_eng: "Perhaps we should book the tickets now before the price goes up.",
        ex_ipa: "/pərˈhæps wi ʃʊd bʊk ðə ˈtɪkɪts naʊ bɪˈfɔːr ðə praɪs ɡoʊz ʌp/",
        ex_vie: "Có lẽ chúng ta nên đặt vé ngay bây giờ trước khi giá vé tăng lên."
    },
    {
        filename: "Cozy.md",
        word: "Cozy",
        pos: "Adjective",
        ipa: "/ˈkoʊ.zi/",
        meaning: "Ấm cúng, dễ chịu, tạo cảm giác thoải mái.",
        exp_eng: "Warm, comfortable, and safe, like a small nice room.",
        exp_ipa: "/wɔːrm, ˈkʌmftəbl, ænd seɪf, laɪk ə smɔːl naɪs ruːm/",
        exp_vie: "Ấm áp, thoải mái và an toàn, giống như một căn phòng nhỏ nhắn xinh đẹp.",
        ex_eng: "After a long day of skiing, we relaxed in a cozy cabin by the fireplace.",
        ex_ipa: "/ˈæftər ə lɔːŋ deɪ ʌv ˈskiːɪŋ, wi rɪˈlækst ɪn ə ˈkoʊzi ˈkæbɪn baɪ ðə ˈfaɪərpleɪs/",
        ex_vie: "Sau một ngày dài trượt tuyết, chúng tôi thư giãn trong một cabin ấm cúng bên lò sưởi."
    },
    {
        filename: "Charm.md",
        word: "Charm",
        pos: "Noun / Verb",
        ipa: "/tʃɑːrm/",
        meaning: "Sức hút, vẻ đẹp duyên dáng, quyến rũ; thu hút, mê hoặc.",
        exp_eng: "A quality that makes something look very beautiful, attractive, and interesting.",
        exp_ipa: "/sub/ə ˈkwɑːləti ðæt meɪks ˈsʌmθɪŋ lʊk ˈvɛri ˈbjuːtɪfl, əˈtræktɪv, ænd ˈɪntrəstɪŋ/",
        exp_vie: "Một phẩm chất làm cho một thứ gì đó trông rất đẹp, hấp dẫn và thú vị.",
        ex_eng: "The small ancient village has a lot of quiet charm that tourists love.",
        ex_ipa: "/ðə smɔːl ˈeɪnʃənt ˈvɪlɪdʒ hæz ə lɒt ʌv ˈkwaɪət tʃɑːrm ðæt ˈtʊrɪsts lʌv/",
        ex_vie: "Ngôi làng cổ nhỏ bé mang một nét quyến rũ yên bình mà du khách rất yêu thích."
    },
    {
        filename: "Venues.md",
        word: "Venues",
        pos: "Noun (plural)",
        ipa: "/ˈven.juːz/",
        meaning: "Địa điểm (nơi diễn ra các sự kiện, hội họp, tiệc tùng).",
        exp_eng: "Places where events, meetings, or concerts take place.",
        exp_ipa: "/ˈpleɪsɪz wɛr ɪˈvɛnts, ˈmiːtɪŋz, ɔːr ˈkɑːnsərts teɪk pleɪs/",
        exp_vie: "Những nơi mà các sự kiện, cuộc họp, hoặc buổi biểu diễn ca nhạc diễn ra.",
        ex_eng: "The city offers many beautiful venues for weddings and music festivals.",
        ex_ipa: "/ðə ˈsɪti ˈɔːfərz ˈmɛni ˈbjuːtɪfl ˈvɛnjuːz fɔːr ˈwɛdɪŋz ænd ˈmjuːzɪk ˈfɛstɪvlz/",
        ex_vie: "Thành phố cung cấp nhiều địa điểm tuyệt đẹp cho các đám cưới và lễ hội âm nhạc."
    },
    {
        filename: "Canal-side.md",
        word: "Canal-side",
        pos: "Noun / Adjective",
        ipa: "/kəˈnæl.saɪd/",
        meaning: "Ven kênh, bờ kênh.",
        exp_eng: "The land next to a canal, or located next to a canal.",
        exp_ipa: "/ðə lænd nɛkst tu ə kəˈnæl, ɔːr ˈloʊkeɪtɪd nɛkst tu ə kəˈnæl/",
        exp_vie: "Khu đất bên cạnh dòng kênh, hoặc được đặt ngay sát cạnh dòng kênh.",
        ex_eng: "We spent the evening dining at a lovely canal-side restaurant in Amsterdam.",
        ex_ipa: "/wi spɛnt ði ˈiːvnɪŋ ˈdaɪnɪŋ æt ə ˈlʌvli kəˈnælsaɪd ˈrɛstrɑːnt ɪn ˈæmstərdæm/",
        ex_vie: "Chúng tôi đã dành cả buổi tối để ăn tối tại một nhà hàng ven kênh đáng yêu ở Amsterdam."
    },
    {
        filename: "In terms of.md",
        word: "In terms of",
        pos: "Phrase",
        ipa: "/ɪn tɜːrmz ʌv/",
        meaning: "Xét về mặt, về diện, liên quan đến.",
        exp_eng: "Speaking about a specific subject, or in relation to something.",
        exp_ipa: "/ˈspiːkɪŋ əˈbaʊt ə spəˈsɪfɪk ˈsʌbdʒɪkt, ɔːr ɪn rɪˈleɪʃn tu ˈsʌmθɪŋ/",
        exp_vie: "Nói về một chủ đề cụ thể, hoặc trong mối liên hệ với một điều gì đó.",
        ex_eng: "In terms of price, this cozy homestay is much better than the big hotel.",
        ex_ipa: "/ɪn tɜːrmz ʌv praɪs, ðɪs ˈkoʊzi ˈhoʊmsteɪ ɪz mʌtʃ ˈbɛtər ðæn ðə bɪɡ hoʊˈtɛl/",
        ex_vie: "Xét về mặt giá cả, căn homestay ấm cúng này tốt hơn nhiều so với khách sạn lớn."
    },
    {
        filename: "Bouquet.md",
        word: "Bouquet",
        pos: "Noun",
        ipa: "/buˈkeɪ/",
        meaning: "Bó hoa; hương thơm thanh tao của rượu vang.",
        exp_eng: "A beautiful bunch of flowers, often given as a gift.",
        exp_ipa: "/ə ˈbjuːtɪfl bʌntʃ ʌv ˈflaʊərz, ˈɔːfn ɡɪvn æz ə ɡɪft/",
        exp_vie: "Một bó hoa đẹp đẽ, thường được trao tặng như một món quà.",
        ex_eng: "The groom gave the bride a gorgeous bouquet of red roses at the wedding.",
        ex_ipa: "/ðə ɡruːm ɡeɪv ðə braɪd ə ˈɡɔːrdʒəs buˈkeɪ ʌv rɛd ˈroʊzɪz æt ðə ˈwɛdɪŋ/",
        ex_vie: "Chú rể đã trao tặng cô dâu một bó hoa hồng đỏ tuyệt đẹp tại lễ cưới."
    }
];

const targetDir = path.resolve('D:\\Sources\\MyDocuments\\SS English\\phase-8\\skill-8-travel-tourism\\the-other-words');

// Make sure target directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Generate files
vocabulary.forEach(item => {
    const filePath = path.join(targetDir, item.filename);
    const content = `# ${item.word}
* **Từ loại:** ${item.pos}
* **IPA:** ${item.ipa}
* **Nghĩa tiếng Việt:** ${item.meaning}

**1. Cách giải thích đơn giản nhất (Dành cho giao tiếp hàng ngày)**
> ${item.exp_eng}
> 
> ${item.exp_ipa}
> 
> ${item.exp_vie}

**2. Đưa ra ví dụ thực tế (Cách tốt nhất để người nghe hiểu ngay)**
> ${item.ex_eng}
> 
> ${item.ex_ipa}
> 
> ${item.ex_vie}
`;

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Generated: ${item.filename}`);
});

console.log("All 28 vocabulary files have been generated successfully under D:\\Sources\\MyDocuments\\SS English\\phase-8\\skill-8-travel-tourism\\the-other-words !");
