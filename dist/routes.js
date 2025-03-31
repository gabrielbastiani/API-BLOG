"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("./config/multer"));
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const checkRole_1 = require("./middlewares/checkRole");
const isAuthenticatedBlog_1 = require("./middlewares/isAuthenticatedBlog");
// -- ROUTES CONFIGURATION BLOG --
const CreateConfigurationBlogController_1 = require("./controllers/configuration_blog/CreateConfigurationBlogController");
const GetConfigurationsBlogController_1 = require("./controllers/configuration_blog/GetConfigurationsBlogController");
const UpdateConfigurationBlogController_1 = require("./controllers/configuration_blog/UpdateConfigurationBlogController");
const DeleteFilesExcelController_1 = require("./controllers/configuration_blog/DeleteFilesExcelController");
const DeleteOgImageController_1 = require("./controllers/configuration_blog/seo/DeleteOgImageController");
const AddOgImagesController_1 = require("./controllers/configuration_blog/seo/AddOgImagesController");
const AddTwitterImagesController_1 = require("./controllers/configuration_blog/seo/AddTwitterImagesController");
const DeleteTwitterImageController_1 = require("./controllers/configuration_blog/seo/DeleteTwitterImageController");
// -- SEO --
const CreateSeoBlogController_1 = require("./controllers/configuration_blog/seo/CreateSeoBlogController");
const GetSeoBlogPageController_1 = require("./controllers/configuration_blog/seo/GetSeoBlogPageController");
const AllSeoBlogPageController_1 = require("./controllers/configuration_blog/seo/AllSeoBlogPageController");
const UpdateSeoSettingsController_1 = require("./controllers/configuration_blog/seo/UpdateSeoSettingsController");
const GetSeoUniqueController_1 = require("./controllers/configuration_blog/seo/GetSeoUniqueController");
const DeleteKeywordController_1 = require("./controllers/configuration_blog/seo/DeleteKeywordController");
const AddKeywordController_1 = require("./controllers/configuration_blog/seo/AddKeywordController");
// -- ROUTES MEDIAS SOCIAL --
const CreateMediaSocialBlogController_1 = require("./controllers/configuration_blog/media_social/CreateMediaSocialBlogController");
const UpdateMediaSocialBlogController_1 = require("./controllers/configuration_blog/media_social/UpdateMediaSocialBlogController");
const MediasSocialsBlogController_1 = require("./controllers/configuration_blog/media_social/MediasSocialsBlogController");
const DeleteMediasSocialsBlogController_1 = require("./controllers/configuration_blog/media_social/DeleteMediasSocialsBlogController");
// -- ROUTES USERS --
const UserCreateController_1 = require("./controllers/user/UserCreateController");
const BulkUserImportController_1 = require("./controllers/user/BulkUserImportController");
const GenerateExcelController_1 = require("./controllers/user/GenerateExcelController");
const UserUpdateDataController_1 = require("./controllers/user/UserUpdateDataController");
const UserAuthController_1 = require("./controllers/user/UserAuthController");
const UserDetailController_1 = require("./controllers/user/UserDetailController");
const RequestPasswordUserRecoveryController_1 = require("./controllers/user/RequestPasswordUserRecoveryController");
const PasswordRecoveryUserController_1 = require("./controllers/user/PasswordRecoveryUserController");
const UserPhotoDeleteController_1 = require("./controllers/user/UserPhotoDeleteController");
const UserDeleteController_1 = require("./controllers/user/UserDeleteController");
const AllUserController_1 = require("./controllers/user/AllUserController");
const SuperUserPublicController_1 = require("./controllers/user/SuperUserPublicController");
// -- ROUTES CATEGORY --
const CategoryCreateController_1 = require("./controllers/category/CategoryCreateController");
const CategoryUpdateDataController_1 = require("./controllers/category/CategoryUpdateDataController");
const CategoryDeleteImageController_1 = require("./controllers/category/CategoryDeleteImageController");
const CategoryDeleteController_1 = require("./controllers/category/CategoryDeleteController");
const CategoriesController_1 = require("./controllers/category/CategoriesController");
const GenerateExcelCategoryController_1 = require("./controllers/category/GenerateExcelCategoryController");
const BulkCategoryImportController_1 = require("./controllers/category/BulkCategoryImportController");
const CategoriesBlogController_1 = require("./controllers/category/CategoriesBlogController");
const PostsCategoryController_1 = require("./controllers/category/PostsCategoryController");
const SitemapCategoryController_1 = require("./controllers/category/SitemapCategoryController");
// -- ROUTES POST --
const PostCreateController_1 = require("./controllers/post/PostCreateController");
const PostUpdateDataController_1 = require("./controllers/post/PostUpdateDataController");
const PostDeleteController_1 = require("./controllers/post/PostDeleteController");
const AllPostController_1 = require("./controllers/post/AllPostController");
const GenerateExcelDeletePostsController_1 = require("./controllers/post/GenerateExcelDeletePostsController");
const BulkDeletePostsController_1 = require("./controllers/post/BulkDeletePostsController");
const GenerateExcelPostsController_1 = require("./controllers/post/GenerateExcelPostsController");
const BulkPostsImportController_1 = require("./controllers/post/BulkPostsImportController");
const PostLikeController_1 = require("./controllers/post/PostLikeController");
const UpdateViewsController_1 = require("./controllers/post/UpdateViewsController");
const NavBarSearchBlogPostController_1 = require("./controllers/post/NavBarSearchBlogPostController");
const SearchPostBlogController_1 = require("./controllers/post/SearchPostBlogController");
const PostContentController_1 = require("./controllers/post/PostContentController");
const ReloadPostDataController_1 = require("./controllers/post/ReloadPostDataController");
const PostSEOContentController_1 = require("./controllers/post/PostSEOContentController");
const DataCategoryPostController_1 = require("./controllers/post/DataCategoryPostController");
const SitemapController_1 = require("./controllers/post/SitemapController");
// -- ROUTES POST CATEGORY --
const PostCategoryCreateController_1 = require("./controllers/post_category/PostCategoryCreateController");
const PostCategoryUpdateDataController_1 = require("./controllers/post_category/PostCategoryUpdateDataController");
const PostCategoryDeleteController_1 = require("./controllers/post_category/PostCategoryDeleteController");
const PostCategoryFindController_1 = require("./controllers/post_category/PostCategoryFindController");
const CategoryUpdateOrderController_1 = require("./controllers/category/CategoryUpdateOrderController");
const MoveCategoryUpController_1 = require("./controllers/category/MoveCategoryUpController");
const MoveCategoryDownController_1 = require("./controllers/category/MoveCategoryDownController");
const AllCategoriesController_1 = require("./controllers/category/AllCategoriesController");
const BulkDeleteCategoryController_1 = require("./controllers/category/BulkDeleteCategoryController");
const GenerateExcelDeleteCategoryController_1 = require("./controllers/category/GenerateExcelDeleteCategoryController");
// -- ROUTES COMMENT --
const CommentCreateController_1 = require("./controllers/comment/CommentCreateController");
const CommentStatusController_1 = require("./controllers/comment/CommentStatusController");
const CommentDeleteController_1 = require("./controllers/comment/CommentDeleteController");
const AllCommentController_1 = require("./controllers/comment/AllCommentController");
const CommentLikeController_1 = require("./controllers/comment/CommentLikeController");
const CommentAllPostController_1 = require("./controllers/comment/CommentAllPostController");
// -- ROUTES FORM CONTACT --
const FormContactCreateController_1 = require("./controllers/form_contact/FormContactCreateController");
const FormContactDeleteController_1 = require("./controllers/form_contact/FormContactDeleteController");
const FormContactFindController_1 = require("./controllers/form_contact/FormContactFindController");
const ContactController_1 = require("./controllers/form_contact/ContactController");
// -- ROUTES NEWSLETTER --
const NewsletterCreateController_1 = require("./controllers/newsletter/NewsletterCreateController");
const NewsletterDeleteController_1 = require("./controllers/newsletter/NewsletterDeleteController");
const NewsletterFindController_1 = require("./controllers/newsletter/NewsletterFindController");
// -- ROUTES EXPORTDATA --
const ExportDataController_1 = require("./controllers/export_data/ExportDataController");
// -- ROUTES NOTIFICATION --
const FindNotificationController_1 = require("./controllers/notification/notification_user/FindNotificationController");
const MarkNotificationReadController_1 = require("./controllers/notification/notification_user/MarkNotificationReadController");
const MarkAllNotificationsAsReadController_1 = require("./controllers/notification/notification_user/MarkAllNotificationsAsReadController");
const FindUsersNotificationController_1 = require("./controllers/notification/notification_user/FindUsersNotificationController");
const NotificationDeleteController_1 = require("./controllers/notification/notification_user/NotificationDeleteController");
const BulkDeleteUsersController_1 = require("./controllers/user/BulkDeleteUsersController");
const GenerateExcelDeleteUserController_1 = require("./controllers/user/GenerateExcelDeleteUserController");
// -- ROUTES TAG --
const CreateTagController_1 = require("./controllers/tag/CreateTagController");
const GenerateExcelTagController_1 = require("./controllers/tag/GenerateExcelTagController");
const BulkTagsImportController_1 = require("./controllers/tag/BulkTagsImportController");
const BulkDeleteTagsController_1 = require("./controllers/tag/BulkDeleteTagsController");
const GenerateExcelDeleteTagController_1 = require("./controllers/tag/GenerateExcelDeleteTagController");
const AllTagController_1 = require("./controllers/tag/AllTagController");
const TagDeleteController_1 = require("./controllers/tag/TagDeleteController");
const UpdateTagController_1 = require("./controllers/tag/UpdateTagController");
// -- ROUTES BLOG --
const UserBlogCreateController_1 = require("./controllers/user/user_blog/UserBlogCreateController");
const UserBlogAuthController_1 = require("./controllers/user/user_blog/UserBlogAuthController");
const AllUserBlogController_1 = require("./controllers/user/user_blog/AllUserBlogController");
const UserBlogUpdateDataController_1 = require("./controllers/user/user_blog/UserBlogUpdateDataController");
const GenerateExcelDeleteUserBlogController_1 = require("./controllers/user/user_blog/GenerateExcelDeleteUserBlogController");
const BulkDeleteUsersBlogController_1 = require("./controllers/user/user_blog/BulkDeleteUsersBlogController");
const UserBlogDeleteController_1 = require("./controllers/user/user_blog/UserBlogDeleteController");
const RequestPasswordUserBlogRecoveryController_1 = require("./controllers/user/user_blog/RequestPasswordUserBlogRecoveryController");
const PasswordRecoveryUserBlogController_1 = require("./controllers/user/user_blog/PasswordRecoveryUserBlogController");
const UserBlogDetailController_1 = require("./controllers/user/user_blog/UserBlogDetailController");
// -- ROUTES DASHBOARD --
const GetPostStatisticsController_1 = require("./controllers/dashboard/GetPostStatisticsController");
const GetCategoryStatisticsController_1 = require("./controllers/dashboard/GetCategoryStatisticsController");
const GetNewsletterStatisticsController_1 = require("./controllers/dashboard/GetNewsletterStatisticsController");
const GetCommentStatisticsController_1 = require("./controllers/dashboard/GetCommentStatisticsController");
const GetContactStatisticsController_1 = require("./controllers/dashboard/GetContactStatisticsController");
const GetUserGrowthMetricsController_1 = require("./controllers/dashboard/GetUserGrowthMetricsController");
const GetMarketingStatisticsController_1 = require("./controllers/dashboard/GetMarketingStatisticsController");
const GetPostViewsByDateController_1 = require("./controllers/dashboard/GetPostViewsByDateController");
const GetMarketingClicksByDateController_1 = require("./controllers/dashboard/GetMarketingClicksByDateController");
// -- ROUTES MARKETING --
const CreateMarketingPublicationController_1 = require("./controllers/marketing_publication/CreateMarketingPublicationController");
const UpdateViewsPuplicationsController_1 = require("./controllers/marketing_publication/UpdateViewsPuplicationsController");
const AllMarketingPublicationController_1 = require("./controllers/marketing_publication/AllMarketingPublicationController");
const MarketingUpdateDataController_1 = require("./controllers/marketing_publication/MarketingUpdateDataController");
const GenerateExcelDeletePublicationController_1 = require("./controllers/marketing_publication/GenerateExcelDeletePublicationController");
const BulkDeleteMarketingPublicationController_1 = require("./controllers/marketing_publication/BulkDeleteMarketingPublicationController");
const MarketingPublicationDeleteDeleteController_1 = require("./controllers/marketing_publication/MarketingPublicationDeleteDeleteController");
const SlideBlogMarketingPublicationController_1 = require("./controllers/marketing_publication/SlideBlogMarketingPublicationController");
const PopupBlogMarketingPublicationController_1 = require("./controllers/marketing_publication/PopupBlogMarketingPublicationController");
const IntervalBannerController_1 = require("./controllers/marketing_publication/IntervalBannerController");
const ExistingIntervalBannerController_1 = require("./controllers/marketing_publication/ExistingIntervalBannerController");
const IntervalUpdateDataController_1 = require("./controllers/marketing_publication/IntervalUpdateDataController");
const IntervalBannerPageController_1 = require("./controllers/marketing_publication/IntervalBannerPageController");
const ExistingSlidesBannerPageController_1 = require("./controllers/marketing_publication/ExistingSlidesBannerPageController");
const ExistingSidebarBannerPageController_1 = require("./controllers/marketing_publication/ExistingSidebarBannerPageController");
const DeleteIntervalBannerController_1 = require("./controllers/marketing_publication/DeleteIntervalBannerController");
const router = (0, express_1.Router)();
exports.router = router;
const upload_image = (0, multer_1.default)(multer_2.default.upload("./images"));
const temp_file = (0, multer_1.default)(multer_2.default.upload("./temp_file"));
// -- ROUTES CONFIGURATION BLOG --
router.post('/configuration_blog/create', upload_image.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), new CreateConfigurationBlogController_1.CreateConfigurationBlogController().handle);
router.get('/configuration_blog/get_configs', new GetConfigurationsBlogController_1.GetConfigurationsBlogController().handle);
router.put('/configuration_blog/update', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['SUPER_ADMIN']), upload_image.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), new UpdateConfigurationBlogController_1.UpdateConfigurationBlogController().handle);
router.get('/configuration_blog/delete_all_files', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['SUPER_ADMIN']), new DeleteFilesExcelController_1.DeleteFilesExcelController().handle);
// -- SEO --
router.post('/seo/create', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), upload_image.fields([{ name: 'ogImages', maxCount: 5 }, { name: 'twitterImages', maxCount: 5 }]), new CreateSeoBlogController_1.CreateSeoBlogController().handle);
router.put('/seo/update_seo', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), upload_image.fields([{ name: 'ogImages', maxCount: 5 }, { name: 'twitterImages', maxCount: 5 }]), new UpdateSeoSettingsController_1.UpdateSeoSettingsController().handle);
router.get('/seo/get_seo', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new GetSeoUniqueController_1.GetSeoUniqueController().handle);
router.delete('/seo/keyword', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new DeleteKeywordController_1.DeleteKeywordController().handle);
router.post('/seo/keyword', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new AddKeywordController_1.AddKeywordController().handle);
router.post('/seo/og-images', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), upload_image.array('images'), new AddOgImagesController_1.AddOgImagesController().handle);
router.delete('/seo/og-image', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new DeleteOgImageController_1.DeleteOgImageController().handle);
router.post('/seo/twitter-images', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), upload_image.array('images'), new AddTwitterImagesController_1.AddTwitterImagesController().handle);
router.delete('/seo/twitter-image', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new DeleteTwitterImageController_1.DeleteTwitterImageController().handle);
router.get('/seo/get_page', new GetSeoBlogPageController_1.GetSeoBlogPageController().handle);
router.get('/seo/all_seos', new AllSeoBlogPageController_1.AllSeoBlogPageController().handle);
// -- ROUTES MEDIAS SOCIAL --
router.post('/create/media_social', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['SUPER_ADMIN']), upload_image.single('file'), new CreateMediaSocialBlogController_1.CreateMediaSocialBlogController().handle);
router.put('/update/media_social', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['SUPER_ADMIN']), upload_image.single('file'), new UpdateMediaSocialBlogController_1.UpdateMediaSocialBlogController().handle);
router.get('/get/media_social', new MediasSocialsBlogController_1.MediasSocialsBlogController().handle);
router.delete('/delete/media_social', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['SUPER_ADMIN']), new DeleteMediasSocialsBlogController_1.DeleteMediasSocialsBlogController().handle);
// -- ROUTES USERS --
router.post('/user/create', upload_image.single('file'), new UserCreateController_1.UserCreateController().handle);
router.post("/user/bulk_users", isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), temp_file.single("file"), new BulkUserImportController_1.BulkUserImportController().handle);
router.get('/user/download_excel', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new GenerateExcelController_1.GenerateExcelController().handle);
router.post('/user/session', new UserAuthController_1.UserAuthController().handle);
router.get('/user/me', isAuthenticated_1.isAuthenticated, new UserDetailController_1.UserDetailController().handle);
router.put('/user/update', isAuthenticated_1.isAuthenticated, upload_image.single('file'), new UserUpdateDataController_1.UserUpdateDataController().handle);
router.put('/user/delete_photo', isAuthenticated_1.isAuthenticated, new UserPhotoDeleteController_1.UserPhotoDeleteController().handle);
router.post('/user/email_recovery_password', new RequestPasswordUserRecoveryController_1.RequestPasswordUserRecoveryController().handle);
router.put('/user/recovery_password', new PasswordRecoveryUserController_1.PasswordRecoveryUserController().handle);
router.delete('/user/delete_user', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new UserDeleteController_1.UserDeleteController().handle);
router.post('/user/bulk_delete_users', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), temp_file.single('file'), new BulkDeleteUsersController_1.BulkDeleteUsersController().handle);
router.get('/user/download_excel_delete_users', isAuthenticated_1.isAuthenticated, new GenerateExcelDeleteUserController_1.GenerateExcelDeleteUserController().handle);
router.get('/user/all_users', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new AllUserController_1.AllUserController().handle);
router.get('/user/publicSuper_user', new SuperUserPublicController_1.SuperUserPublicController().handle);
// -- ROUTES CATEGORY --
router.post('/category/create', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), upload_image.single('file'), new CategoryCreateController_1.CategoryCreateController().handle);
router.put('/category/update', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), upload_image.single('file'), new CategoryUpdateDataController_1.CategoryUpdateDataController().handle);
router.put('/category/updateOrder', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new CategoryUpdateOrderController_1.CategoryUpdateOrderController().handle);
router.put('/category/moveUp', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new MoveCategoryUpController_1.MoveCategoryUpController().handle);
router.put('/category/moveDown', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new MoveCategoryDownController_1.MoveCategoryDownController().handle);
router.put('/category/delete_image', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new CategoryDeleteImageController_1.CategoryDeleteImageController().handle);
router.delete('/category/delete_category', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new CategoryDeleteController_1.CategoryDeleteController().handle);
router.get('/category/cms', isAuthenticated_1.isAuthenticated, new CategoriesController_1.CategoriesController().handle);
router.get('/category/cms/all_categories', isAuthenticated_1.isAuthenticated, new AllCategoriesController_1.AllCategoriesController().handle);
router.get('/category/donwload_excel_categories', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new GenerateExcelCategoryController_1.GenerateExcelCategoryController().handle);
router.post('/category/bulk_categories', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), temp_file.single("file"), new BulkCategoryImportController_1.BulkCategoryImportController().handle);
router.post('/category/bulk_delete_category', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), temp_file.single('file'), new BulkDeleteCategoryController_1.BulkDeleteCategoryController().handle);
router.get('/category/download_excel_delete_category', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new GenerateExcelDeleteCategoryController_1.GenerateExcelDeleteCategoryController().handle);
router.get('/categories/blog/posts', new CategoriesBlogController_1.CategoriesBlogController().handle);
router.get('/category/on_posts', new PostsCategoryController_1.PostsCategoryController().handle);
router.get('/category/data_category', new DataCategoryPostController_1.DataCategoryPostController().handle);
router.get('/posts_categories/sitemap', new SitemapCategoryController_1.SitemapCategoryController().handle);
// -- ROUTES POST --
router.post('/post/create_post', isAuthenticated_1.isAuthenticated, upload_image.single('file'), new PostCreateController_1.PostCreateController().handle);
router.put('/post/update', isAuthenticated_1.isAuthenticated, upload_image.single('file'), new PostUpdateDataController_1.PostUpdateDataController().handle);
router.delete('/post/delete_post', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new PostDeleteController_1.PostDeleteController().handle);
router.get('/post/cms', isAuthenticated_1.isAuthenticated, new AllPostController_1.AllPostController().handle);
router.get('/post/download_excel_delete_post', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new GenerateExcelDeletePostsController_1.GenerateExcelDeletePostsController().handle);
router.post('/post/bulk_delete_posts', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), temp_file.single('file'), new BulkDeletePostsController_1.BulkDeletePostsController().handle);
router.get('/post/donwload_excel_posts', isAuthenticated_1.isAuthenticated, new GenerateExcelPostsController_1.GenerateExcelPostsController().handle);
router.post('/post/bulk_posts', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), temp_file.single("file"), new BulkPostsImportController_1.BulkPostsImportController().handle);
router.patch('/post/likes', new PostLikeController_1.PostLikeController().handle);
router.patch("/post/:post_id/views", new UpdateViewsController_1.UpdateViewsController().handle);
router.get('/post/blog/search_nav_bar', new NavBarSearchBlogPostController_1.NavBarSearchBlogPostController().handle);
router.get('/post/articles/blog', new SearchPostBlogController_1.SearchPostBlogController().handle);
router.get('/post/article/content', new PostContentController_1.PostContentController().handle);
router.get('/post/reload_data', new ReloadPostDataController_1.ReloadPostDataController().handle);
router.get('/post/articles/seo', new PostSEOContentController_1.PostSEOContentController().handle);
router.get('/article/sitemap', new SitemapController_1.SitemapController().handle);
// -- ROUTES POST CATEGORY --
router.post('/post_category/create_post_category', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new PostCategoryCreateController_1.PostCategoryCreateController().handle);
router.put('/post_category/update', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new PostCategoryUpdateDataController_1.PostCategoryUpdateDataController().handle);
router.delete('/post_category/delete', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new PostCategoryDeleteController_1.PostCategoryDeleteController().handle);
router.get('/post_category/get_post_category', isAuthenticated_1.isAuthenticated, new PostCategoryFindController_1.PostCategoryFindController().handle);
// -- ROUTES COMMENT --
router.post('/comment/create_comment', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new CommentCreateController_1.CommentCreateController().handle);
router.put('/comment/update_status', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new CommentStatusController_1.CommentStatusController().handle);
router.patch('/comment/likes', new CommentLikeController_1.CommentLikeController().handle);
router.put('/comment/delete', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new CommentDeleteController_1.CommentDeleteController().handle);
router.get('/comment/cms/get_comments', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new AllCommentController_1.AllCommentController().handle);
router.get('/comment/get_comments/post', new CommentAllPostController_1.CommentAllPostController().handle);
// -- ROUTES FORM CONTACT --
router.post('/form_contact/create_form_contact', new FormContactCreateController_1.FormContactCreateController().handle);
router.delete('/form_contact/delete_form_contatct', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new FormContactDeleteController_1.FormContactDeleteController().handle);
router.get('/contacts_form/all_contacts', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new FormContactFindController_1.FormContactFindController().handle);
router.get('/contacts_form/contact', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new ContactController_1.ContactController().handle);
// -- ROUTES NEWSLETTER --
router.post('/newsletter/create_newsletter', new NewsletterCreateController_1.NewsletterCreateController().handle);
router.delete('/newsletter/delete_newsletter', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new NewsletterDeleteController_1.NewsletterDeleteController().handle);
router.get('/newsletter/get_newsletters', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new NewsletterFindController_1.NewsletterFindController().handle);
// -- ROUTES EXPORTDATA --
router.post('/export_data', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new ExportDataController_1.ExportDataController().handle);
// -- ROUTES NOTIFICATION --
router.get('/user/notifications', isAuthenticated_1.isAuthenticated, new FindNotificationController_1.FindNotificationController().handle);
router.put('/notifications/mark-read', isAuthenticated_1.isAuthenticated, new MarkNotificationReadController_1.MarkNotificationReadController().handle);
router.put('/notifications/mark-all-read', isAuthenticated_1.isAuthenticated, new MarkAllNotificationsAsReadController_1.MarkAllNotificationsAsReadController().handle);
router.get('/notifications_user/central_notifications', isAuthenticated_1.isAuthenticated, new FindUsersNotificationController_1.FindUsersNotificationController().handle);
router.delete('/notifications_user/delete_notification', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new NotificationDeleteController_1.NotificationDeleteController().handle);
// -- ROUTES TAG --
router.post('/tag/create_tag', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new CreateTagController_1.CreateTagController().handle);
router.get('/tag/donwload_excel_tag', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new GenerateExcelTagController_1.GenerateExcelTagController().handle);
router.post('/tag/bulk_tags', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), temp_file.single("file"), new BulkTagsImportController_1.BulkTagsImportController().handle);
router.post('/tag/bulk_delete_tags', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), temp_file.single('file'), new BulkDeleteTagsController_1.BulkDeleteTagsController().handle);
router.get('/tag/download_excel_delete_tags', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new GenerateExcelDeleteTagController_1.GenerateExcelDeleteTagController().handle);
router.get('/tag/all_tags', isAuthenticated_1.isAuthenticated, new AllTagController_1.AllTagController().handle);
router.delete('/tag/delete_tag', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new TagDeleteController_1.TagDeleteController().handle);
router.put('/tag/update', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new UpdateTagController_1.UpdateTagController().handle);
// -- ROUTES BLOG --
router.post('/user/user_blog/create', upload_image.single('file'), new UserBlogCreateController_1.UserBlogCreateController().handle);
router.post('/user/user_blog/session', new UserBlogAuthController_1.UserBlogAuthController().handle);
router.get('/user/user_blog/me', isAuthenticatedBlog_1.isAuthenticatedBlog, new UserBlogDetailController_1.UserBlogDetailController().handle);
router.get('/user/user_blog/all_users_blog', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new AllUserBlogController_1.AllUserBlogController().handle);
router.put('/user/user_blog/update', isAuthenticatedBlog_1.isAuthenticatedBlog, upload_image.single('file'), new UserBlogUpdateDataController_1.UserBlogUpdateDataController().handle);
router.get('/user/user_blog/download_excel_delete_users_blog', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new GenerateExcelDeleteUserBlogController_1.GenerateExcelDeleteUserBlogController().handle);
router.post('/user/user_blog/bulk_delete_users_blog', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), temp_file.single('file'), new BulkDeleteUsersBlogController_1.BulkDeleteUsersBlogController().handle);
router.delete('/user/user_blog/delete_user_blog', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new UserBlogDeleteController_1.UserBlogDeleteController().handle);
router.post('/user/user_blog/email_recovery_password', new RequestPasswordUserBlogRecoveryController_1.RequestPasswordUserBlogRecoveryController().handle);
router.put('/user/user_blog/recovery_password_user_blog', new PasswordRecoveryUserBlogController_1.PasswordRecoveryUserBlogController().handle);
// -- ROUTES DASHBOARD --
router.get('/dashboard/posts/statistics', isAuthenticated_1.isAuthenticated, new GetPostStatisticsController_1.GetPostStatisticsController().handle);
router.get('/dashboard/categories/statistics', isAuthenticated_1.isAuthenticated, new GetCategoryStatisticsController_1.GetCategoryStatisticsController().handle);
router.get('/dashboard/newslatter/statistics', isAuthenticated_1.isAuthenticated, new GetNewsletterStatisticsController_1.GetNewsletterStatisticsController().handle);
router.get('/dashboard/comment/statistics', isAuthenticated_1.isAuthenticated, new GetCommentStatisticsController_1.GetCommentStatisticsController().handle);
router.get('/dashboard/contact/statistics', isAuthenticated_1.isAuthenticated, new GetContactStatisticsController_1.GetContactStatisticsController().handle);
router.get('/dashboard/userBlog/statistics', isAuthenticated_1.isAuthenticated, new GetUserGrowthMetricsController_1.GetUserGrowthMetricsController().handle);
router.get('/dashboard/publication_marketing/statistics', isAuthenticated_1.isAuthenticated, new GetMarketingStatisticsController_1.GetMarketingStatisticsController().handle);
router.get('/dashboard/posts/views-by-date', isAuthenticated_1.isAuthenticated, new GetPostViewsByDateController_1.GetPostViewsByDateController().handle);
router.get('/dashboard/publication_marketing/views-by-date', isAuthenticated_1.isAuthenticated, new GetMarketingClicksByDateController_1.GetMarketingClicksByDateController().handle);
// -- ROUTES MARKETING --
router.post('/marketing_publication/create', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), upload_image.single('file'), new CreateMarketingPublicationController_1.CreateMarketingPublicationController().handle);
router.patch('/marketing_publication/:marketingPublication_id/clicks', new UpdateViewsPuplicationsController_1.UpdateViewsPuplicationsController().handle);
router.get('/marketing_publication/all_publications', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new AllMarketingPublicationController_1.AllMarketingPublicationController().handle);
router.put('/marketing_publication/delete_image', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new CategoryDeleteImageController_1.CategoryDeleteImageController().handle);
router.put('/marketing_publication/update', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), upload_image.single('file'), new MarketingUpdateDataController_1.MarketingUpdateDataController().handle);
router.get('/marketing_publication/download_excel_delete_marketing', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new GenerateExcelDeletePublicationController_1.GenerateExcelDeletePublicationController().handle);
router.post('/marketing_publication/bulk_delete_publications', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), temp_file.single('file'), new BulkDeleteMarketingPublicationController_1.BulkDeleteMarketingPublicationController().handle);
router.delete('/marketing_publication/delete_publications', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new MarketingPublicationDeleteDeleteController_1.MarketingPublicationDeleteDeleteController().handle);
router.get('/marketing_publication/blog_publications/slides', new SlideBlogMarketingPublicationController_1.SlideBlogMarketingPublicationController().handle);
router.get('/marketing_publication/blog_publications/popup', new PopupBlogMarketingPublicationController_1.PopupBlogMarketingPublicationController().handle);
router.post('/marketing_publication/interval_banner', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new IntervalBannerController_1.IntervalBannerController().handle);
router.get('/marketing_publication/interval_banner/existing_interval', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new ExistingIntervalBannerController_1.ExistingIntervalBannerController().handle);
router.put('/marketing_publication/interval_banner/update_data', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new IntervalUpdateDataController_1.IntervalUpdateDataController().handle);
router.get('/marketing_publication/interval_banner/page_banner', new IntervalBannerPageController_1.IntervalBannerPageController().handle);
router.get('/marketing_publication/existing_banner', new ExistingSlidesBannerPageController_1.ExistingSlidesBannerPageController().handle);
router.get('/marketing_publication/existing_sidebar', new ExistingSidebarBannerPageController_1.ExistingSidebarBannerPageController().handle);
router.delete('/marketing_publication/delete', isAuthenticated_1.isAuthenticated, (0, checkRole_1.checkRole)(['ADMIN', 'SUPER_ADMIN']), new DeleteIntervalBannerController_1.DeleteIntervalBannerController().handle);
//# sourceMappingURL=routes.js.map