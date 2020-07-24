package com.ssafy.cobook.service.dto.user;

import com.ssafy.cobook.domain.clubmember.MemberRole;
import com.ssafy.cobook.domain.user.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserSimpleResDto {

    private Long userId;
    private String userName;
    private MemberRole role;

    public UserSimpleResDto(User user, MemberRole role) {
        this.userId = user.getId();
        this.userName = user.getUserName();
        this.role = role;
    }
}
