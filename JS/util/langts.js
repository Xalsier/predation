function getTranslations(languageCode) {
    switch (languageCode) {
        case 'en':
            return { // Translations done by Xalsier
                'select-lang': 'Select Language:',
                '2select-lang': 'Select Language:', 
                'continue-btn': 'Continue',
                'leave-btn' : 'Leave',
                'WebnovelBTN' : 'Webnovel',
                'CalendarBTN': 'Calendar',
                'prev-chapter': 'Previous',
                'next-chapter': 'Next',
                'show-com': 'Show Comments',
                'return-btn': 'Return',
                'post-comment': 'Post', 
                'artwork-by':'Artwork by:',
                'preface1' : 'Chapter 2 is out! ^ ^',
                'preface2' : "Fair warning, this site will be buggy. It's been coded from scratch (again) to be mobile friendly, but if you find things don't work the way they should- please let me know on" ,
                'preface3' : "For right now, some features won't work. Like the gallery, translation, and even stats. I promise these will be fixed." ,
                'preface4' : "If you'd like to read the first draft of Chapter 1, you can. I've also made it possible for you to comment. ^-^" ,
                'preface5' : '-- Xalsier',
                'content-tag1' : 'Not Rated',
                'content-tag2' : 'Furry Soulslike',
                'content-tag3' : 'Graphic Violence',
                'summary-stat1': 'Author:',  
                'summary-stat2': 'Last Updated:', 
                'summary-stat3': 'Comments:', 
                'summary-stat4': 'Edits:', 
                'summary-stat5': 'Words:', 
                'summary-stat6': 'Chapters:', 
                'summary-stat7': 'Uploaded:', 
                'summary-blurb': "During the Golden Age of Predation, Naori embarks on their first hunt- without the protection of Shiro and Sera. With the ambitions of Ryo and the Hyena's set high, an opportunity is left open at revisiting the old guarded monastery where Chief Avali found Sera's ancestor, encased in stone.", 
                'summary-title': 'Primal Samsara: Risk of Predation', 
            };
            case 'es': // Gemini Translations
                return {
                    'select-lang': 'Seleccionar idioma:', // Select Language
                    '2select-lang': 'Seleccionar idioma:', // (Assuming this is used somewhere else)
                    'continue-btn': 'Continuar', 
                    'leave-btn' : 'Salir', 
                    'WebnovelBTN' : 'Webnovela', // (Assuming you want 'Webnovel' translated)
                    'CalendarBTN': 'Calendario',
                    'prev-chapter': 'Capítulo anterior', // Previous
                    'next-chapter': 'Siguiente chapter', // Next
                    'show-com': 'Mostrar comentarios', 
                    'return-btn': 'Regresar', 
                    'post-comment': 'Publicar',  // Post
                    'artwork-by':'Ilustración por:', // Artwork by
                    'preface1' : '¡Capítulo 2 ya está disponible! ^ ^', // Preface
                    'preface2' : "Advertencia justa, este sitio tendrá errores. Se ha codificado desde cero (nuevamente) para que sea compatible con dispositivos móviles, pero si encuentra que las cosas no funcionan como deberían, hágamelo saber en",  // Fair warning...
                    'preface3' : "Por ahora, algunas funciones no funcionarán. Como la galería, la traducción e incluso las estadísticas. Prometo que esto se solucionará.", 
                    'preface4' : "Si desea leer el primer borrador del Capítulo 1, puede hacerlo. También he hecho posible que comentes. ^-^", 
                    'preface5' : '-- Xalsier',
                    'content-tag1' : 'Sin calificación', 
                    'content-tag2' : 'Furry Soulslike', 
                    'content-tag3' : 'Violencia gráfica',
                    'summary-stat1': 'Autor:', // Author
                    'summary-stat2': 'Última actualización:', // Last Updated
                    'summary-stat3': 'Comentarios:', // Comments
                    'summary-stat4': 'Ediciones:', // Edits 
                    'summary-stat5': 'Palabras:', // Words
                    'summary-stat6': 'Capítulos:', // Chapters
                    'summary-stat7': 'Subido:', // Uploaded
                    'summary-blurb': 'Durante la Edad de Oro de la Depredación, Naori se embarca en su primera cacería, sin la protección de Shiro y Sera. Con las ambiciones de Ryo y las hienas en alto, se deja una oportunidad abierta para volver a visitar el antiguo monasterio vigilado donde el Jefe Avali encontró al antepasado de Sera, encerrado en piedra.',  // Summary Blurb - Needs Spanish
                    'summary-title': 'Samsara Primordial: Riesgo de Depredación', // Summary Title - Needs Spanish
                }; 
    
        case 'ja':
            return { // Translations added by Gemini AI
                'select-lang': '言語を選択:', 
                '2select-lang': '言語を選択:', 
                'continue-btn': '続ける', 
                'leave-btn' : '去る ',
                'WebnovelBTN' : 'ウェブノベル',
                'CalendarBTN': 'カレンダー',
                'prev-chapter': '前',
                'next-chapter': '次',
                'show-com': 'コメントを表示する',
                'return-btn': '戻る',
                'post-comment': '投稿する',
                'artwork-by':'作品: ',
                'preface1' : '第2章が出ました! ^ ^',
                'preface2' : 'ご注意ください、このサイトはバグがある可能性があります。モバイルフレンドリーにするために（再び）一からコードを書き直しましたが、もし物事が期待通りに動作しない場合は、で教えてください。' ,
                'preface3' : '現時点では、一部の機能は動作しません。ギャラリー、翻訳、さらには統計もです。これらは修正されることを約束します。' ,
                'preface4' : '第1章の初稿を読みたい場合は、読むことができます。また、コメントすることも可能にしました。^-^' ,
                'preface5' : '-- ザルシア',
                'content-tag1' : '評価なし',
                'content-tag2' : 'ファーリーソウルズライク',
                'content-tag3' : 'グラフィックバイオレンス',
                'summary-stat1': '著者: ', // Author
                'summary-stat2': '最終更新日: ', // Last Updated
                'summary-stat3': 'コメント: ', // Comments
                'summary-stat4': '編集: ', // Edits
                'summary-stat5': '言葉: ', // Words
                'summary-stat6': '章: ', // Chapters
                'summary-stat7': 'アップロードしました: ', // Uploaded 
                'summary-blurb': '捕食の黄金時代に、ナオリはシロとセラの保護なしに彼らの最初の狩りを始めます。リョウとハイエナの野心が大きくなると、セラの祖先が石に包まれた古い守られた修道院を再訪する機会が残されます。', // Summary Blurb - Needs Japanese
                'summary-title': 'プライマル・サムサーラ: プレデーションのリスク',  // Summary Title - 
            };
        case 'ko':
            return {
                'select-lang': '언어 선택:', 
                '2select-lang': '언어 선택:', 
                'continue-btn': '계속하다', 
                'leave-btn' : '떠나다',
                'WebnovelBTN' : '웹소설',
                'CalendarBTN': '달력',
                'prev-chapter': '이전',
                'next-chapter': '다음',
                'show-com': '댓글보기',
                'return-btn': '되돌아가기',
                'post-comment': '게시하다', 
                'artwork-by':'에 의해:',
                'preface1' : '챕터 2가 나왔습니다! ^ ^',
                'preface2' : '공정한 경고, 이 사이트는 버그가 있을 것입니다. 모바일 친화적으로 만들기 위해 (다시) 처음부터 코딩되었지만, 만약 사물이 제대로 작동하지 않는다면 에서 알려주세요.' ,
                'preface3' : '지금 당장은, 몇몇 기능이 작동하지 않을 것입니다. 갤러리, 번역, 심지어 통계까지도요. 이 문제들은 고쳐질 것을 약속드립니다.' ,
                'preface4' : '제1장 초안을 읽고 싶다면, 읽을 수 있습니다. 또한, 댓글을 달 수도 있게 하였습니다. ^-^' ,
                'preface5' : '-- Xalsier',
                'content-tag1' : '평가 없음',
                'content-tag2' : '리 소울즈라이크',
                'content-tag3' : '그래픽 폭력',
                'summary-stat1': '저자:', // Author
                'summary-stat2': '마지막 업데이트 날짜:', // Last Updated
                'summary-stat3': '댓글:', // Comments
                'summary-stat4': '수정:', // Edits 
                'summary-stat5': '단어:', // Words
                'summary-stat6': '장:', // Chapters
                'summary-stat7': '업로드됨:', // Uploaded
                'summary-blurb': '포식의 황금時代に 나오리는 시로와 세라의 보호 없이 첫 번째 사냥을 시작합니다. 료와 하이에나의 야망이 높아지면서 세라의 조상이 돌에 싸인 채로 발견된 오래된 수도원을 다시 방문할 수 있는 기회가 열려 있습니다.', // Summary Blurb - Needs Korean
                'summary-title': '원시 삼사라: 약탈의 위험',   
            };
        default:
            return {}; 
    }
}
// Fetch and parse the JSON file
function fetchPreface() {
    return fetch('../../JSON/preface.json')
        .then(response => response.json());
}

function updateTranslations(languageCode) {
    const translations = getTranslations(languageCode);

    fetchPreface().then(preface => {
        // Replace 'preface1' entry with the one from preface.json
        if (preface[languageCode]) {
            translations['preface1'] = preface[languageCode][0];
        }

        for (const [id, translationKey] of Object.entries(translations)) {
            const element = document.getElementById(id);
            if (element) { 
                element.textContent = translationKey;
            }
        }
    });
}

window.updateTranslations = updateTranslations;
