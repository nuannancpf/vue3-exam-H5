import pubUse from "@/utils/pub-use"
const { getAssetsFile } = pubUse
const iconDict = {
    1: getAssetsFile("Group826.png"),
    2: getAssetsFile("Group827.png"),
    3: getAssetsFile("Group828.png"),
    4: getAssetsFile("Group829.png"),
    5: getAssetsFile("Group830.png"),
    6: getAssetsFile("Group831.png"),
}
const iconCorrect = {
    1: getAssetsFile("PEP.png"),
    2: getAssetsFile("RedStreamer.png"),
    3: getAssetsFile("PREP.png"),
    4: getAssetsFile("Condom.png"),
    5: getAssetsFile("Virus.png"),
    6: getAssetsFile("Group738.png"),
}


// 随机生成图标数组
export const generateRandomIcons = () => {
    let correctIconIndex
    let correctIndex
    let cardData = []
    let wnogsData = []
    correctIconIndex = Math.floor(Math.random() * 6) + 1; // 生成正确图标的随机索引
    correctIndex = iconCorrect[correctIconIndex]
    for (let i = 0; i < 4; i++) {
        cardData.push({
            index: correctIconIndex,
            logoImgUrl: iconDict[correctIconIndex],
            cardFlip: false
        });
    }

    for (let i = 0; i < 32; i++) {
        let randomIconIndex = Math.floor(Math.random() * 6) + 1;
        while (randomIconIndex === correctIconIndex) {
            randomIconIndex = Math.floor(Math.random() * 6) + 1;
        }
        wnogsData.push({
            index: randomIconIndex,
            logoImgUrl: iconDict[randomIconIndex],
            cardFlip: false
        });
    }
    let examList = shuffleArray([...cardData, ...wnogsData]) || []
    console.log(examList);
    
    return { examList, examData: cardData,examArr: wnogsData, correctIndex };
};

// 随机打乱数组顺序
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};
