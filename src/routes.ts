import { Router } from "express";
import multer from 'multer';
import uploadConfig from './config/multer';
import { isAuthenticated } from "./middlewares/isAuthenticated";

// -- ROUTES CONFIGURATION BLOG --
import { CreateConfigurationBlogController } from "./controllers/configuration_blog/CreateConfigurationBlogController";
import { GetConfigurationsBlogController } from "./controllers/configuration_blog/GetConfigurationsBlogController";
import { UpdateConfigurationBlogController } from "./controllers/configuration_blog/UpdateConfigurationBlogController";
import { DeleteFilesExcelController } from "./controllers/configuration_blog/DeleteFilesExcelController";

// -- SEO --
import { CreateSeoBlogController } from "./controllers/configuration_blog/seo/CreateSeoBlogController";
import { GetSeoBlogPageController } from "./controllers/configuration_blog/seo/GetSeoBlogPageController";
import { AllSeoBlogPageController } from "./controllers/configuration_blog/seo/AllSeoBlogPageController";
import { UpdateSeoSettingsController } from "./controllers/configuration_blog/seo/UpdateSeoSettingsController";
import { GetSeoUniqueController } from "./controllers/configuration_blog/seo/GetSeoUniqueController";
import { DeleteKeywordController } from "./controllers/configuration_blog/seo/DeleteKeywordController";
import { AddKeywordController } from "./controllers/configuration_blog/seo/AddKeywordController";

// -- ROUTES MEDIAS SOCIAL --
import { CreateMediaSocialBlogController } from "./controllers/configuration_blog/media_social/CreateMediaSocialBlogController";
import { UpdateMediaSocialBlogController } from "./controllers/configuration_blog/media_social/UpdateMediaSocialBlogController";
import { MediasSocialsBlogController } from "./controllers/configuration_blog/media_social/MediasSocialsBlogController";
import { DeleteMediasSocialsBlogController } from "./controllers/configuration_blog/media_social/DeleteMediasSocialsBlogController";

// -- ROUTES USERS --
import { UserCreateController } from "./controllers/user/UserCreateController";
import { BulkUserImportController } from "./controllers/user/BulkUserImportController";
import { GenerateExcelController } from "./controllers/user/GenerateExcelController";
import { UserUpdateDataController } from "./controllers/user/UserUpdateDataController";
import { UserAuthController } from "./controllers/user/UserAuthController";
import { UserDetailController } from "./controllers/user/UserDetailController";
import { RequestPasswordUserRecoveryController } from "./controllers/user/RequestPasswordUserRecoveryController";
import { PasswordRecoveryUserController } from "./controllers/user/PasswordRecoveryUserController";
import { UserPhotoDeleteController } from "./controllers/user/UserPhotoDeleteController";
import { UserDeleteController } from "./controllers/user/UserDeleteController";
import { AllUserController } from "./controllers/user/AllUserController";
import { SuperUserPublicController } from "./controllers/user/SuperUserPublicController";

// -- ROUTES CATEGORY --
import { CategoryCreateController } from "./controllers/category/CategoryCreateController";
import { CategoryUpdateDataController } from "./controllers/category/CategoryUpdateDataController";
import { CategoryDeleteImageController } from "./controllers/category/CategoryDeleteImageController";
import { CategoryDeleteController } from "./controllers/category/CategoryDeleteController";
import { CategoriesController } from "./controllers/category/CategoriesController";
import { GenerateExcelCategoryController } from "./controllers/category/GenerateExcelCategoryController";
import { BulkCategoryImportController } from "./controllers/category/BulkCategoryImportController";
import { CategoriesBlogController } from "./controllers/category/CategoriesBlogController";
import { PostsCategoryController } from "./controllers/category/PostsCategoryController";

// -- ROUTES POST --
import { PostCreateController } from "./controllers/post/PostCreateController";
import { PostUpdateDataController } from "./controllers/post/PostUpdateDataController";
import { PostDeleteController } from "./controllers/post/PostDeleteController";
import { AllPostController } from "./controllers/post/AllPostController";
import { GenerateExcelDeletePostsController } from "./controllers/post/GenerateExcelDeletePostsController";
import { BulkDeletePostsController } from "./controllers/post/BulkDeletePostsController";
import { GenerateExcelPostsController } from "./controllers/post/GenerateExcelPostsController";
import { BulkPostsImportController } from "./controllers/post/BulkPostsImportController";
import { PostLikeController } from "./controllers/post/PostLikeController";
import { UpdateViewsController } from "./controllers/post/UpdateViewsController";
import { NavBarSearchBlogPostController } from "./controllers/post/NavBarSearchBlogPostController";
import { SearchPostBlogController } from "./controllers/post/SearchPostBlogController";
import { PostContentController } from "./controllers/post/PostContentController";
import { ReloadPostDataController } from "./controllers/post/ReloadPostDataController";
import { PostSEOContentController } from "./controllers/post/PostSEOContentController";

// -- ROUTES POST CATEGORY --
import { PostCategoryCreateController } from "./controllers/post_category/PostCategoryCreateController";
import { PostCategoryUpdateDataController } from "./controllers/post_category/PostCategoryUpdateDataController";
import { PostCategoryDeleteController } from "./controllers/post_category/PostCategoryDeleteController";
import { PostCategoryFindController } from "./controllers/post_category/PostCategoryFindController";
import { CategoryUpdateOrderController } from "./controllers/category/CategoryUpdateOrderController";
import { MoveCategoryUpController } from "./controllers/category/MoveCategoryUpController";
import { MoveCategoryDownController } from "./controllers/category/MoveCategoryDownController";
import { AllCategoriesController } from "./controllers/category/AllCategoriesController";
import { BulkDeleteCategoryController } from "./controllers/category/BulkDeleteCategoryController";
import { GenerateExcelDeleteCategoryController } from "./controllers/category/GenerateExcelDeleteCategoryController";

// -- ROUTES COMMENT --
import { CommentCreateController } from "./controllers/comment/CommentCreateController";
import { CommentStatusController } from "./controllers/comment/CommentStatusController";
import { CommentDeleteController } from "./controllers/comment/CommentDeleteController";
import { AllCommentController } from "./controllers/comment/AllCommentController";
import { CommentLikeController } from "./controllers/comment/CommentLikeController";
import { CommentAllPostController } from "./controllers/comment/CommentAllPostController";

// -- ROUTES FORM CONTACT --
import { FormContactCreateController } from "./controllers/form_contact/FormContactCreateController";
import { FormContactDeleteController } from "./controllers/form_contact/FormContactDeleteController";
import { FormContactFindController } from "./controllers/form_contact/FormContactFindController";
import { ContactController } from "./controllers/form_contact/ContactController";

// -- ROUTES NEWSLETTER --
import { NewsletterCreateController } from "./controllers/newsletter/NewsletterCreateController";
import { NewsletterDeleteController } from "./controllers/newsletter/NewsletterDeleteController";
import { NewsletterFindController } from "./controllers/newsletter/NewsletterFindController";

// -- ROUTES EXPORTDATA --
import { ExportDataController } from "./controllers/export_data/ExportDataController";

// -- ROUTES NOTIFICATION --
import { FindNotificationController } from "./controllers/notification/notification_user/FindNotificationController";
import { MarkNotificationReadController } from "./controllers/notification/notification_user/MarkNotificationReadController";
import { MarkAllNotificationsAsReadController } from "./controllers/notification/notification_user/MarkAllNotificationsAsReadController";
import { FindUsersNotificationController } from "./controllers/notification/notification_user/FindUsersNotificationController";
import { NotificationDeleteController } from "./controllers/notification/notification_user/NotificationDeleteController";
import { BulkDeleteUsersController } from "./controllers/user/BulkDeleteUsersController";
import { GenerateExcelDeleteUserController } from "./controllers/user/GenerateExcelDeleteUserController";

// -- ROUTES TAG --
import { CreateTagController } from "./controllers/tag/CreateTagController";
import { GenerateExcelTagController } from "./controllers/tag/GenerateExcelTagController";
import { BulkTagsImportController } from "./controllers/tag/BulkTagsImportController";
import { BulkDeleteTagsController } from "./controllers/tag/BulkDeleteTagsController";
import { GenerateExcelDeleteTagController } from "./controllers/tag/GenerateExcelDeleteTagController";
import { AllTagController } from "./controllers/tag/AllTagController";
import { TagDeleteController } from "./controllers/tag/TagDeleteController";
import { UpdateTagController } from "./controllers/tag/UpdateTagController";

// -- ROUTES BLOG --
import { UserBlogCreateController } from "./controllers/user/user_blog/UserBlogCreateController";
import { UserBlogAuthController } from "./controllers/user/user_blog/UserBlogAuthController";
import { AllUserBlogController } from "./controllers/user/user_blog/AllUserBlogController";
import { UserBlogUpdateDataController } from "./controllers/user/user_blog/UserBlogUpdateDataController";
import { GenerateExcelDeleteUserBlogController } from "./controllers/user/user_blog/GenerateExcelDeleteUserBlogController";
import { BulkDeleteUsersBlogController } from "./controllers/user/user_blog/BulkDeleteUsersBlogController";
import { UserBlogDeleteController } from "./controllers/user/user_blog/UserBlogDeleteController";
import { RequestPasswordUserBlogRecoveryController } from "./controllers/user/user_blog/RequestPasswordUserBlogRecoveryController";
import { PasswordRecoveryUserBlogController } from "./controllers/user/user_blog/PasswordRecoveryUserBlogController";
import { UserBlogDetailController } from "./controllers/user/user_blog/UserBlogDetailController";

// -- ROUTES DASHBOARD --
import { GetPostStatisticsController } from "./controllers/dashboard/GetPostStatisticsController";
import { GetCategoryStatisticsController } from "./controllers/dashboard/GetCategoryStatisticsController";
import { GetNewsletterStatisticsController } from "./controllers/dashboard/GetNewsletterStatisticsController";
import { GetCommentStatisticsController } from "./controllers/dashboard/GetCommentStatisticsController";
import { GetContactStatisticsController } from "./controllers/dashboard/GetContactStatisticsController";
import { GetUserGrowthMetricsController } from "./controllers/dashboard/GetUserGrowthMetricsController";
import { GetMarketingStatisticsController } from "./controllers/dashboard/GetMarketingStatisticsController";
import { GetPostViewsByDateController } from "./controllers/dashboard/GetPostViewsByDateController";
import { GetMarketingClicksByDateController } from "./controllers/dashboard/GetMarketingClicksByDateController";

// -- ROUTES MARKETING --
import { CreateMarketingPublicationController } from "./controllers/marketing_publication/CreateMarketingPublicationController";
import { UpdateViewsPuplicationsController } from "./controllers/marketing_publication/UpdateViewsPuplicationsController";
import { AllMarketingPublicationController } from "./controllers/marketing_publication/AllMarketingPublicationController";
import { MarketingUpdateDataController } from "./controllers/marketing_publication/MarketingUpdateDataController";
import { GenerateExcelDeletePublicationController } from "./controllers/marketing_publication/GenerateExcelDeletePublicationController";
import { BulkDeleteMarketingPublicationController } from "./controllers/marketing_publication/BulkDeleteMarketingPublicationController";
import { MarketingPublicationDeleteDeleteController } from "./controllers/marketing_publication/MarketingPublicationDeleteDeleteController";
import { SlideBlogMarketingPublicationController } from "./controllers/marketing_publication/SlideBlogMarketingPublicationController";
import { PopupBlogMarketingPublicationController } from "./controllers/marketing_publication/PopupBlogMarketingPublicationController";
import { IntervalBannerController } from "./controllers/marketing_publication/IntervalBannerController";
import { ExistingIntervalBannerController } from "./controllers/marketing_publication/ExistingIntervalBannerController";
import { IntervalUpdateDataController } from "./controllers/marketing_publication/IntervalUpdateDataController";
import { IntervalBannerPageController } from "./controllers/marketing_publication/IntervalBannerPageController";
import { ExistingSlidesBannerPageController } from "./controllers/marketing_publication/ExistingSlidesBannerPageController";
import { ExistingSidebarBannerPageController } from "./controllers/marketing_publication/ExistingSidebarBannerPageController";
import { DeleteIntervalBannerController } from "./controllers/marketing_publication/DeleteIntervalBannerController";
import { DataCategoryPostController } from "./controllers/post/DataCategoryPostController";
import { DeleteOgImageController } from "./controllers/configuration_blog/seo/DeleteOgImageController";
import { AddOgImagesController } from "./controllers/configuration_blog/seo/AddOgImagesController";
import { AddTwitterImagesController } from "./controllers/configuration_blog/seo/AddTwitterImagesController";
import { DeleteTwitterImageController } from "./controllers/configuration_blog/seo/DeleteTwitterImageController";


const router = Router();
const upload_image = multer(uploadConfig.upload("./images"));
const temp_file = multer(uploadConfig.upload("./temp_file"));


// -- ROUTES CONFIGURATION BLOG --
router.post('/configuration_blog/create', upload_image.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), new CreateConfigurationBlogController().handle);
router.get('/configuration_blog/get_configs', new GetConfigurationsBlogController().handle);
router.put('/configuration_blog/update', isAuthenticated, upload_image.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), new UpdateConfigurationBlogController().handle);
router.get('/configuration_blog/delete_all_files', isAuthenticated, new DeleteFilesExcelController().handle);

// -- SEO --
router.post('/seo/create', isAuthenticated, upload_image.fields([{ name: 'ogImages', maxCount: 5 }, { name: 'twitterImages', maxCount: 5 }]), new CreateSeoBlogController().handle);
router.put('/seo/update_seo', isAuthenticated, upload_image.fields([{ name: 'ogImages', maxCount: 5 }, { name: 'twitterImages', maxCount: 5 }]), new UpdateSeoSettingsController().handle);
router.get('/seo/get_seo', isAuthenticated, new GetSeoUniqueController().handle);
router.delete('/seo/keyword', isAuthenticated, new DeleteKeywordController().handle);
router.post('/seo/keyword', isAuthenticated, new AddKeywordController().handle);
router.post('/seo/og-images', isAuthenticated, upload_image.array('images'), new AddOgImagesController().handle);
router.delete('/seo/og-image', isAuthenticated, new DeleteOgImageController().handle);
router.post('/seo/twitter-images', isAuthenticated, upload_image.array('images'), new AddTwitterImagesController().handle);
router.delete('/seo/twitter-image', isAuthenticated, new DeleteTwitterImageController().handle);
router.get('/seo/get_page', new GetSeoBlogPageController().handle);
router.get('/seo/all_seos', new AllSeoBlogPageController().handle);

// -- ROUTES MEDIAS SOCIAL --
router.post('/create/media_social', isAuthenticated, upload_image.single('file'), new CreateMediaSocialBlogController().handle);
router.put('/update/media_social', isAuthenticated, upload_image.single('file'), new UpdateMediaSocialBlogController().handle);
router.get('/get/media_social', new MediasSocialsBlogController().handle);
router.delete('/delete/media_social', isAuthenticated, new DeleteMediasSocialsBlogController().handle);

// -- ROUTES USERS --
router.post('/user/create', upload_image.single('file'), new UserCreateController().handle);
router.post("/user/bulk_users", isAuthenticated, temp_file.single("file"), new BulkUserImportController().handle);
router.get('/user/download_excel', isAuthenticated, new GenerateExcelController().handle);
router.post('/user/session', new UserAuthController().handle);
router.get('/user/me', isAuthenticated, new UserDetailController().handle);
router.put('/user/update', isAuthenticated, upload_image.single('file'), new UserUpdateDataController().handle);
router.put('/user/delete_photo', isAuthenticated, new UserPhotoDeleteController().handle);
router.post('/user/email_recovery_password', new RequestPasswordUserRecoveryController().handle);
router.put('/user/recovery_password', new PasswordRecoveryUserController().handle);
router.delete('/user/delete_user', isAuthenticated, new UserDeleteController().handle);
router.post('/user/bulk_delete_users', isAuthenticated, temp_file.single('file'), new BulkDeleteUsersController().handle);
router.get('/user/download_excel_delete_users', isAuthenticated, new GenerateExcelDeleteUserController().handle);
router.get('/user/all_users', isAuthenticated, new AllUserController().handle);
router.get('/user/publicSuper_user', new SuperUserPublicController().handle);

// -- ROUTES CATEGORY --
router.post('/category/create', isAuthenticated, upload_image.single('file'), new CategoryCreateController().handle);
router.put('/category/update', isAuthenticated, upload_image.single('file'), new CategoryUpdateDataController().handle);
router.put('/category/updateOrder', isAuthenticated, new CategoryUpdateOrderController().handle);
router.put('/category/moveUp', isAuthenticated, new MoveCategoryUpController().handle);
router.put('/category/moveDown', isAuthenticated, new MoveCategoryDownController().handle);
router.put('/category/delete_image', isAuthenticated, new CategoryDeleteImageController().handle);
router.delete('/category/delete_category', isAuthenticated, new CategoryDeleteController().handle);
router.get('/category/cms', isAuthenticated, new CategoriesController().handle);
router.get('/category/cms/all_categories', isAuthenticated, new AllCategoriesController().handle);
router.get('/category/donwload_excel_categories', isAuthenticated, new GenerateExcelCategoryController().handle);
router.post('/category/bulk_categories', isAuthenticated, temp_file.single("file"), new BulkCategoryImportController().handle);
router.post('/category/bulk_delete_category', isAuthenticated, temp_file.single('file'), new BulkDeleteCategoryController().handle);
router.get('/category/download_excel_delete_category', isAuthenticated, new GenerateExcelDeleteCategoryController().handle);
router.get('/categories/blog/posts', new CategoriesBlogController().handle);
router.get('/category/on_posts', new PostsCategoryController().handle);
router.get('/category/data_category', new DataCategoryPostController().handle);

// -- ROUTES POST --
router.post('/post/create_post', isAuthenticated, upload_image.single('file'), new PostCreateController().handle);
router.put('/post/update', isAuthenticated, upload_image.single('file'), new PostUpdateDataController().handle);
router.delete('/post/delete_post', isAuthenticated, new PostDeleteController().handle);
router.get('/post/cms', isAuthenticated, new AllPostController().handle);
router.get('/post/download_excel_delete_post', isAuthenticated, new GenerateExcelDeletePostsController().handle);
router.post('/post/bulk_delete_posts', isAuthenticated, temp_file.single('file'), new BulkDeletePostsController().handle);
router.get('/post/donwload_excel_posts', isAuthenticated, new GenerateExcelPostsController().handle);
router.post('/post/bulk_posts', isAuthenticated, temp_file.single("file"), new BulkPostsImportController().handle);
router.patch('/post/likes', new PostLikeController().handle);
router.patch("/post/:post_id/views", new UpdateViewsController().handle);
router.get('/post/blog/search_nav_bar', new NavBarSearchBlogPostController().handle);
router.get('/post/articles/blog', new SearchPostBlogController().handle);
router.get('/post/article/content', new PostContentController().handle);
router.get('/post/reload_data', new ReloadPostDataController().handle);
router.get('/post/articles/seo', new PostSEOContentController().handle);

// -- ROUTES POST CATEGORY --
router.post('/post_category/create_post_category', isAuthenticated, new PostCategoryCreateController().handle);
router.put('/post_category/update', isAuthenticated, new PostCategoryUpdateDataController().handle);
router.delete('/post_category/delete', isAuthenticated, new PostCategoryDeleteController().handle);
router.get('/post_category/get_post_category', isAuthenticated, new PostCategoryFindController().handle);

// -- ROUTES COMMENT --
router.post('/comment/create_comment', isAuthenticated, new CommentCreateController().handle);
router.put('/comment/update_status', isAuthenticated, new CommentStatusController().handle);
router.patch('/comment/likes', new CommentLikeController().handle);
router.put('/comment/delete', isAuthenticated, new CommentDeleteController().handle);
router.get('/comment/cms/get_comments', isAuthenticated, new AllCommentController().handle);
router.get('/comment/get_comments/post', new CommentAllPostController().handle);

// -- ROUTES FORM CONTACT --
router.post('/form_contact/create_form_contact', new FormContactCreateController().handle);
router.delete('/form_contact/delete_form_contatct', isAuthenticated, new FormContactDeleteController().handle);
router.get('/contacts_form/all_contacts', isAuthenticated, new FormContactFindController().handle);
router.get('/contacts_form/contact', isAuthenticated, new ContactController().handle);

// -- ROUTES NEWSLETTER --
router.post('/newsletter/create_newsletter', new NewsletterCreateController().handle);
router.delete('/newsletter/delete_newsletter', isAuthenticated, new NewsletterDeleteController().handle);
router.get('/newsletter/get_newsletters', isAuthenticated, new NewsletterFindController().handle);

// -- ROUTES EXPORTDATA --
router.post('/export_data', isAuthenticated, new ExportDataController().handle);

// -- ROUTES NOTIFICATION --
router.get('/user/notifications', isAuthenticated, new FindNotificationController().handle);
router.put('/notifications/mark-read', isAuthenticated, new MarkNotificationReadController().handle);
router.put('/notifications/mark-all-read', isAuthenticated, new MarkAllNotificationsAsReadController().handle);
router.get('/notifications_user/central_notifications', isAuthenticated, new FindUsersNotificationController().handle);
router.delete('/notifications_user/delete_notification', isAuthenticated, new NotificationDeleteController().handle);

// -- ROUTES TAG --
router.post('/tag/create_tag', isAuthenticated, new CreateTagController().handle);
router.get('/tag/donwload_excel_tag', isAuthenticated, new GenerateExcelTagController().handle);
router.post('/tag/bulk_tags', isAuthenticated, temp_file.single("file"), new BulkTagsImportController().handle);
router.post('/tag/bulk_delete_tags', isAuthenticated, temp_file.single('file'), new BulkDeleteTagsController().handle);
router.get('/tag/download_excel_delete_tags', isAuthenticated, new GenerateExcelDeleteTagController().handle);
router.get('/tag/all_tags', isAuthenticated, new AllTagController().handle);
router.delete('/tag/delete_tag', isAuthenticated, new TagDeleteController().handle);
router.put('/tag/update', isAuthenticated, new UpdateTagController().handle);

// -- ROUTES BLOG --
router.post('/user/user_blog/create', upload_image.single('file'), new UserBlogCreateController().handle);
router.post('/user/user_blog/session', new UserBlogAuthController().handle);
router.get('/user/user_blog/me', isAuthenticated, new UserBlogDetailController().handle);
router.get('/user/user_blog/all_users_blog', isAuthenticated, new AllUserBlogController().handle);
router.put('/user/user_blog/update', isAuthenticated, upload_image.single('file'), new UserBlogUpdateDataController().handle);
router.get('/user/user_blog/download_excel_delete_users_blog', isAuthenticated, new GenerateExcelDeleteUserBlogController().handle);
router.post('/user/user_blog/bulk_delete_users_blog', isAuthenticated, temp_file.single('file'), new BulkDeleteUsersBlogController().handle);
router.delete('/user/user_blog/delete_user_blog', isAuthenticated, new UserBlogDeleteController().handle);
router.post('/user/user_blog/email_recovery_password', new RequestPasswordUserBlogRecoveryController().handle);
router.put('/user/user_blog/recovery_password_user_blog', new PasswordRecoveryUserBlogController().handle);

// -- ROUTES DASHBOARD --
router.get('/dashboard/posts/statistics', isAuthenticated, new GetPostStatisticsController().handle);
router.get('/dashboard/categories/statistics', isAuthenticated, new GetCategoryStatisticsController().handle);
router.get('/dashboard/newslatter/statistics', isAuthenticated, new GetNewsletterStatisticsController().handle);
router.get('/dashboard/comment/statistics', isAuthenticated, new GetCommentStatisticsController().handle);
router.get('/dashboard/contact/statistics', isAuthenticated, new GetContactStatisticsController().handle);
router.get('/dashboard/userBlog/statistics', isAuthenticated, new GetUserGrowthMetricsController().handle);
router.get('/dashboard/publication_marketing/statistics', isAuthenticated, new GetMarketingStatisticsController().handle);
router.get('/dashboard/posts/views-by-date', isAuthenticated, new GetPostViewsByDateController().handle);
router.get('/dashboard/publication_marketing/views-by-date', isAuthenticated, new GetMarketingClicksByDateController().handle);

// -- ROUTES MARKETING --
router.post('/marketing_publication/create', isAuthenticated, upload_image.single('file'), new CreateMarketingPublicationController().handle);
router.patch('/marketing_publication/:marketingPublication_id/clicks', new UpdateViewsPuplicationsController().handle);
router.get('/marketing_publication/all_publications', isAuthenticated, new AllMarketingPublicationController().handle);
router.put('/marketing_publication/delete_image', isAuthenticated, new CategoryDeleteImageController().handle);
router.put('/marketing_publication/update', isAuthenticated, upload_image.single('file'), new MarketingUpdateDataController().handle);
router.get('/marketing_publication/download_excel_delete_marketing', isAuthenticated, new GenerateExcelDeletePublicationController().handle);
router.post('/marketing_publication/bulk_delete_publications', isAuthenticated, temp_file.single('file'), new BulkDeleteMarketingPublicationController().handle);
router.delete('/marketing_publication/delete_publications', isAuthenticated, new MarketingPublicationDeleteDeleteController().handle);
router.get('/marketing_publication/blog_publications/slides', new SlideBlogMarketingPublicationController().handle);
router.get('/marketing_publication/blog_publications/popup', new PopupBlogMarketingPublicationController().handle);
router.post('/marketing_publication/interval_banner', isAuthenticated, new IntervalBannerController().handle);
router.get('/marketing_publication/interval_banner/existing_interval', isAuthenticated, new ExistingIntervalBannerController().handle);
router.put('/marketing_publication/interval_banner/update_data', isAuthenticated, new IntervalUpdateDataController().handle);
router.get('/marketing_publication/interval_banner/page_banner', new IntervalBannerPageController().handle);
router.get('/marketing_publication/existing_banner', new ExistingSlidesBannerPageController().handle);
router.get('/marketing_publication/existing_sidebar', new ExistingSidebarBannerPageController().handle);
router.delete('/marketing_publication/delete', isAuthenticated, new DeleteIntervalBannerController().handle);


export { router }