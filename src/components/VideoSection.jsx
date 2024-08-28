const VideoSection = ({ videoKey, videoName }) => {
  // console.log(videoKey);

  return (
    // <div className="container flex justify-center mx-auto my-3 border border-red-500 ">
    <div className="container lg:w-3/5  mx-auto my-3 relative aspect-video ">
      <iframe
        // <iframe> öğesinin yalnızca kullanıcı görünürlük alanına yaklaştığında yüklenmesi için
        loading="lazy"
        className="rounded-xl absolute top-0 left-0 w-full h-full"
        // rel=0 -> related videos'u kaldırıyor
        src={`https://www.youtube.com/embed/${videoKey}?rel=0`}
        title="Inside Out 2 | Plan For The Future"
        // frameBorder="0"
        // encrypted-media -> videoyu şifreli bir şekilde gösteriyor
        // clipboard-write -> kopyalama işlemlerini yapabiliyoruz
        // autoplay -> otomatik başlatma
        // accelerometer -> cihazın ivmesini alıyor, web sayfasının bu sensör verilerini kullanabilmesi için
        // gyroscope -> cihazın jiroskopunu alıyor
        // web-share -> web paylaşımı yapabiliyoruz
        // strict-origin-when-cross-origin -> güvenlik önlemleri için
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoSection;
