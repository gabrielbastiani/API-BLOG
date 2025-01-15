import prismaClient from '../../prisma';

interface CommentRequest {
    post_id: string;
}

class CommentAllPostService {
    async execute({ post_id }: CommentRequest) {
        const comments = await prismaClient.comment.findMany({
            where: {
                post_id: post_id
            },
            include: {
                parent: {
                    include: {
                        replies: {
                            include: {
                                parent: {
                                    include: {
                                        replies: {
                                            include: {
                                                parent: {
                                                    include: {
                                                        replies: {
                                                            include: {
                                                                parent: {
                                                                    include: {
                                                                        replies: {
                                                                            include: {
                                                                                parent: {
                                                                                    include: {
                                                                                        replies: {
                                                                                            include: {
                                                                                                parent: {
                                                                                                    include: {
                                                                                                        replies: {
                                                                                                            include: {
                                                                                                                parent: {
                                                                                                                    include: {
                                                                                                                        replies: {
                                                                                                                            include: {
                                                                                                                                parent: {
                                                                                                                                    include: {
                                                                                                                                        replies: true
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return comments;
    }
}

export { CommentAllPostService };