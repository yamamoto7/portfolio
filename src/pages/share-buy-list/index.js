import React from "react";
import "./index.css";
import getFilePath from '../../utils/getFilePath'

function IndexPage() {
  return (
<div class="apps-mobile">

    <header class="clip-eb-alt xs-text-center">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="share-buy-list-container">
                <a class="navbar-logo" href="../">
                    <img src={getFilePath("logo.svg")} alt="Logo" class="height-36" />
                </a>
                <button class="navbar-toggler border-none" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <img src={getFilePath("contents/shareBuyList/icons/ic-menu.svg")} alt="" />
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="close-button">
                            <button class="navbar-toggler border-none" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="true" aria-label="Toggle navigation">
                                <img src={getFilePath("contents/shareBuyList/icons/ic-close.svg")} alt="" />
                            </button>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Privacy Policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div id="hero" class="hero xl-pt-96 lg-pt-96 md-pt-96 pt-40">
            <div class="share-buy-list-container">
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <div class="">
                            <h1 class="text-hkgrotesk font-bold text-black mb-24 wow fadeInUp">Share Buy List</h1>
                            <p class="text-20 leading-36 text-black mb-40 wow fadeInUp">家族、友達などと共有できるお買い物リストアプリ。<br /></p>
                            <div class="button-cta mb-60 lg-mb-116 xl-mb-116">
                                <a href="#" class="mr-16 xs-mr-8 wow fadeInUp">
                                    <img src={getFilePath("contents/shareBuyList/button-app@2x.png")} />
                                </a>
                                <a href="#" class=" wow fadeInUp">
                                    <img src={getFilePath("contents/shareBuyList/button-play@2x.png")} />
                                </a>
                            </div>
                            <div class="touch d-none d-lg-flex d-xl-flex items-center wow fadeInUp">
                                <img src={getFilePath("contents/shareBuyList/icons/touch.svg")} alt="" class="w-32 h-32 mr-12" />
                                <p><span class="font-semibold">Start scrolling</span> to see our features</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <div class="illustration relative text-center text-lg-left text-xl-left z-10 wow fadeInUp">
                            <img src={getFilePath("contents/shareBuyList/screen02.png")} alt=""
                                class="xl-absolute lg-absolute z-10 lg-ml-40 xl-ml-40 -mb-180" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div id="features" class="features xl-py-124 lg-py-124 py-72 md-pb-20 sm-pb-20 xs-pb-20">
        <div class="share-buy-list-container">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
                    <div class="heading text-center mb-64">
                        <h2 class="text-hkgrotesk font-bold text-alt text-black my-16 wow fadeInUp">Inprogress</h2>
                        <p class="text-18 text-gray mb-0 wow fadeInUp">アプリ開発中。11月中旬リリース予定。</p>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                        <div
                            class="text-center d-flex flex-column items-center mb-48 ml-auto mr-auto max-w-sm wow fadeInUp">
                            <div class="ic ic-badge ic-lg bg-primary-100 mb-32">
                                <img src={getFilePath("contents/shareBuyList/icons/application.svg")} alt="" />
                            </div>
                            <h5 class="text-hkgrotesk font-bold text-black mb-12">xxx</h5>
                            <p class="text-gray mb-20">xxx</p>
                            <a href="#" class="text-opensans font-bold text-18">Learn more <i
                                    class="fas fa-arrow-right text-14 ml-8"></i></a>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                        <div
                            class="text-center d-flex flex-column items-center mb-48 ml-auto mr-auto max-w-sm wow fadeInUp">
                            <div class="ic ic-badge ic-lg bg-primary-100 mb-32">
                                <img src={getFilePath("contents/shareBuyList/icons/male-wallet.svg")} alt="" />
                            </div>
                            <h5 class="text-hkgrotesk font-bold text-black mb-12">xxx</h5>
                            <p class="text-gray mb-20">xxx</p>
                            <a href="#" class="text-opensans font-bold text-18">Learn more <i
                                    class="fas fa-arrow-right text-14 ml-8"></i></a>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                        <div
                            class="text-center d-flex flex-column items-center mb-48 ml-auto mr-auto max-w-sm wow fadeInUp">
                            <div class="ic ic-badge ic-lg bg-primary-100 mb-32">
                                <img src={getFilePath("contents/shareBuyList/icons/substract.svg")} alt="" />
                            </div>
                            <h5 class="text-hkgrotesk font-bold text-black mb-12">xxx</h5>
                            <p class="text-gray mb-20">xxx</p>
                            <a href="#" class="text-opensans font-bold text-18">Learn more <i
                                    class="fas fa-arrow-right text-14 ml-8"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="more-features py-176 xs-py-120">
        <div class="share-buy-list-container">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-12 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
                    <div class="heading text-center mb-64 mt-52 xs-mt-0">
                        <h2 class="text-hkgrotesk font-bold text-alt text-white mb-20 wow fadeInUp">New Personal Finance
                            App</h2>
                        <p class="text-18 leading-32 text-white mb-0 wow fadeInUp">xxx</p>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="row">
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <div class="lg-pt-60 xl-pt-60 lg-pr-44 xl-pr-44">
                            <div class="mb-48 lg-mb-64 xl-mb-64 xl-text-right lg-text-right wow fadeInUp">
                                <img src={getFilePath("contents/shareBuyList/icons/circle-orange.svg")} alt="" class="mb-16" />
                                <h5 class="text-hkgrotesk font-bold text-white">xxx</h5>
                                <p class="min-h-5em">xxx</p>
                            </div>
                            <div class="mb-48 lg-mb-64 xl-mb-64 xl-text-right lg-text-right wow fadeInUp">
                                <img src={getFilePath("contents/shareBuyList/icons/circle-orange.svg")} alt="" class="mb-16" />
                                <h5 class="text-hkgrotesk font-bold text-white">xxx</h5>
                                <p class="min-h-5em">xxx</p>
                            </div>
                            <div class="xl-text-right lg-text-right wow fadeInUp">
                                <img src={getFilePath("contents/shareBuyList/icons/circle-orange.svg")} alt="" class="mb-16" />
                                <h5 class="text-hkgrotesk font-bold text-white">xxx</h5>
                                <p class="min-h-5em">xxx</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 d-none d-lg-flex d-xl-flex">
                        <div class="iphone wow fadeInUp mb-72">
                            <img src={getFilePath("contents/shareBuyList/screen01.png")} alt="" class="w-100" />
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <div class="lg-pt-60 xl-pt-60 lg-pl-44 xl-pl-44">
                            <div class="mb-48 lg-mb-64 xl-mb-64 xl-text-left lg-text-left wow fadeInUp">
                                <img src={getFilePath("contents/shareBuyList/icons/circle-orange.svg")} alt="" class="mb-16" />
                                <h5 class="text-hkgrotesk font-bold text-white">xxx</h5>
                                <p class="min-h-5em">xxx</p>
                            </div>
                            <div class="mb-48 lg-mb-64 xl-mb-64 xl-text-left lg-text-left wow fadeInUp">
                                <img src={getFilePath("contents/shareBuyList/icons/circle-orange.svg")} alt="" class="mb-16" />
                                <h5 class="text-hkgrotesk font-bold text-white">xxx</h5>
                                <p class="min-h-5em">xxx</p>
                            </div>
                            <div class="xl-text-left lg-text-left wow fadeInUp">
                                <img src={getFilePath("contents/shareBuyList/icons/circle-orange.svg")} alt="" class="mb-16" />
                                <h5 class="text-hkgrotesk font-bold text-white">xxx</h5>
                                <p class="min-h-5em">xxx</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer id="footer" class="footer footer-white">
        <div class="share-buy-list-container">
            <div class="row">
                <div class="footer-left col-lg-3 col-md-5 col-sm-12">
                    <div class="footer-widget wow fadeInUp">
                        <a href="#" class="logo"><img src={getFilePath("logo.svg")} alt="" /></a>
                        <p class="description">個人で開発をしています</p>
                        <ul class="footer-sosmed">
                            <li><button class="btn btn-rounded btn-sm bg-gray-100 text-gray btn-ic"><i
                                        class="fab fa-facebook-f"></i></button></li>
                            <li><button class="btn btn-rounded btn-sm bg-gray-100 text-gray btn-ic"><i
                                        class="fab fa-twitter"></i></button></li>
                            <li><button class="btn btn-rounded btn-sm bg-gray-100 text-gray btn-ic"><i
                                        class="fab fa-instagram"></i></button></li>
                            <li><button class="btn btn-rounded btn-sm bg-gray-100 text-gray btn-ic"><i
                                        class="fab fa-linkedin"></i></button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12 col-xl-12">
                    <div class="footer-copyright wow fadeInUp">
                        <p>© 2022 All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>

</div>

  );
}

export default IndexPage;
