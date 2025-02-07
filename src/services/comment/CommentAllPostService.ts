import prismaClient from '../../prisma';

interface CommentRequest {
    post_id: string;
}

class CommentAllPostService {
    async execute({ post_id }: CommentRequest) {

        if (!post_id || post_id.trim().length === 0) {
            throw new Error("ID do post inválido.");
        }
        
        const comments = await prismaClient.comment.findMany({
            where: {
                post_id: post_id,
                status: "Aprovado"
            },
            orderBy: {
                created_at: 'desc'
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